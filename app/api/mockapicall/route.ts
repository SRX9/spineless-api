import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { cookies } from 'next/headers';
import { createServerClient, createSupabaseServerClient_old } from '@/lib/supabase';

type OpenRouterResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

type GenerateRequest = {
  name: string;
  description: string;
  schema: any;
  apiId?: string;
};

type GenerateResponse = {
  result: string;
  error?: string;
};

export async function POST(request: Request) {
  // Authenticate user and get Supabase client
  const supabaseAuth = createServerClient(await cookies());
  const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Enforce and update daily usage quota
  const today = new Date().toISOString().split('T')[0];
  const planLimit = 10;
  try {
    const { data: existingQuota } = await supabaseAuth
      .from('usage_quotas')
      .select('requests_used, requests_limit')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();
    const used = existingQuota?.requests_used ?? 0;
    const limit = existingQuota?.requests_limit ?? planLimit;
    if (used >= limit) {
      return new NextResponse("Today's API quota is finished", {
        status: 429,
        headers: { 'content-type': 'text/plain' }
      });
    }
    if (existingQuota) {
      await supabaseAuth
        .from('usage_quotas')
        .update({ requests_used: used + 1 })
        .eq('user_id', user.id)
        .eq('date', today);
    } else {
      await supabaseAuth
        .from('usage_quotas')
        .insert({ user_id: user.id, date: today, requests_used: 1, requests_limit: planLimit });
    }
  } catch (e) {
    console.error('Error enforcing/updating usage quota:', e);
  }

  try {
    const params = await request.json() as GenerateRequest;
    
    // OpenAI configuration
    const apiKey = process.env.GEMINI_DEV_AI_KEY;
    const modelKey = "gemini-2.0-flash";
    const maxTokens = 4000;
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    
    // Create a prompt that instructs the LLM to generate data based on the schema
    const prompt = `
      You are a mock API that returns data according to a specific JSON schema.
      
      API Name: ${params.name}
      API Description: ${params.description}
      
      Return JSON data that exactly matches this schema structure:
      ${JSON.stringify(params.schema, null, 2)}
      
      Only respond with valid JSON matching the schema. Do not include any explanations or markdown formatting.
      Generate realistic, diverse and contextually appropriate data for each field based on the field names.
      For arrays, include 1-4 items.
    `;
    
    console.log("Sending request to OpenAI API");
    
    // Make the API call to OpenAI
    try {
      const completion = await openai.chat.completions.create({
        model: modelKey,
        messages: [
          { role: "system", content: "You are a mock API service that generates realistic data according to JSON schemas." },
          { role: "user", content: prompt }
        ],
        max_tokens: maxTokens
      });
      
      const generatedText = completion.choices[0].message.content || "";
    
    // Try to parse the response to ensure it's valid JSON
    try {
      // Extract just the JSON part in case the model included any text before or after
      // Using a regex approach compatible with older JavaScript versions
      const jsonResponseMatch = generatedText.match(/\{[\s\S]*\}/);
      const jsonContent = jsonResponseMatch ? jsonResponseMatch[0] : generatedText;
      
      // Parse and stringify to ensure proper JSON formatting
      const parsedJson = JSON.parse(jsonContent);
      return NextResponse.json({ result: JSON.stringify(parsedJson, null, 2) });
    } catch (parseError: any) {
      console.error("Error parsing AI response as JSON:", parseError);
      console.log("Raw AI response:", generatedText);
      
      // Send back the error and raw response
      return NextResponse.json({ 
        result: '', 
        error: `Failed to parse response as JSON: ${parseError.message}`
      }, { status: 400 });
    }
    } catch (apiError: any) {
      console.error("Error from OpenAI API:", apiError);
      throw new Error(`OpenAI API error: ${apiError.message}`);
    }
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ result: '', error: error.message }, { status: 500 });
  }
}
