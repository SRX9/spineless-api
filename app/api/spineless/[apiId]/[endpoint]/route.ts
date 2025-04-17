import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers'; 
import OpenAI from 'openai';
import { createServerClient } from '@/lib/supabase';

export interface ApiRequestLog {
  api_endpoint_id: string;
  user_id: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  request_headers?: object | null;
  request_body?: object | null;
  response_status: number;
  response_time_ms: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string; apiId: string }> }
) {
  const { endpoint, apiId } = await params;
  return handleRequest(request, { endpoint, apiId }, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string; apiId: string }> }
) {
  const { endpoint, apiId } = await params;
  return handleRequest(request, { endpoint, apiId }, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string; apiId: string }> }
) {
  const { endpoint, apiId } = await params;
  return handleRequest(request, { endpoint, apiId }, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string; apiId: string }> }
) {
  const { endpoint, apiId } = await params;
  return handleRequest(request, { endpoint, apiId }, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string; apiId: string }> }
) {
  const { endpoint, apiId } = await params;
  return handleRequest(request, { endpoint, apiId }, 'PATCH');
}

async function handleRequest(
  request: NextRequest, 
  params: { endpoint: string; apiId: string },
  requestMethod: string
) {
  const startTime = Date.now();
  let responseStatus: number = 500; 
  let logData: Partial<ApiRequestLog> = {}; 
  let response: NextResponse | null = null; 

  const supabase = createServerClient(await cookies());

  try {
    const { endpoint, apiId } = params;

    logData.api_endpoint_id = apiId;
    const forwardedFor = request.headers.get('x-forwarded-for');
    logData.ip_address = forwardedFor ? forwardedFor.split(',')[0].trim() : null;
    logData.user_agent = request.headers.get('user-agent') ?? null;
    logData.request_headers = Object.fromEntries(request.headers.entries());

    try {
      if (request.body) {
        const clonedRequest = request.clone(); 
        const bodyText = await clonedRequest.text();
        if (bodyText) {
           logData.request_body = JSON.parse(bodyText); 
        }
      }
    } catch (e) {
        console.warn('Could not parse request body for logging:', e);
    }

    if (!endpoint || !apiId) {
      responseStatus = 400;
      response = NextResponse.json(
        { error: 'Missing required path parameters' },
        { status: responseStatus }
      );
      return response; 
    }

    const { data: apiEndpoint, error: fetchError } = await supabase
      .from('api_endpoints')
      .select('*')
      .eq('id', apiId)
      .single();

    if (fetchError || !apiEndpoint) {
      console.error('Error fetching API endpoint:', fetchError);
      responseStatus = 404;
      response = NextResponse.json(
        { error: 'API endpoint not found or access denied' },
        { status: responseStatus }
      );
      return response; 
    }

    logData.user_id = apiEndpoint.user_id;

    // --- Enforce daily usage quota ---
    const today = new Date().toISOString().split('T')[0];
    const { data: quotaRec, error: quotaErr } = await supabase
      .from('usage_quotas')
      .select('requests_used, requests_limit')
      .eq('user_id', apiEndpoint.user_id)
      .eq('date', today)
      .single();
    const used = quotaRec?.requests_used ?? 0;
    const limit = quotaRec?.requests_limit ?? 10;
    if (used >= limit) {
      return new NextResponse("Today's API quota is finished", {
        status: 429,
        headers: { 'content-type': 'text/plain' }
      });
    }

    if (apiEndpoint.method !== requestMethod) {
      responseStatus = 405;
      response = NextResponse.json(
        { error: `Method not allowed. This endpoint accepts ${apiEndpoint.method} requests only.` },
        { status: responseStatus }
      );
       return response; 
    }

    if (apiEndpoint.delay_ms && apiEndpoint.delay_ms > 0) {
      await new Promise(resolve => setTimeout(resolve, apiEndpoint.delay_ms));
    }

    if (apiEndpoint.cached_response) {
      try {
        const parsedResponse = JSON.parse(apiEndpoint.cached_response);
        responseStatus = apiEndpoint.status_code || 200;
        response = NextResponse.json(parsedResponse, { 
          status: responseStatus 
        });
        return response; 
      } catch (parseError) {
        console.error('Error parsing cached response:', parseError);
      }
    }

    const apiKey = process.env.GEMINI_DEV_AI_KEY;
    const modelKey = "gemini-2.0-flash";
    const maxTokens = 4000;
    
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    
    const prompt = `
      You are a mock API that returns data according to a specific JSON schema.
      
      API Name: ${apiEndpoint.name}
      API Description: ${apiEndpoint.description}
      
      Return JSON data that exactly matches this schema structure:
      ${JSON.stringify(apiEndpoint.response_body, null, 2)}
      
      Only respond with valid JSON matching the schema. Do not include any explanations or markdown formatting.
      Generate realistic, diverse and contextually appropriate data for each field based on the field names.
      For arrays, include 1-4 items.
    `;
    
    console.log("Sending request to OpenAI API for real mock API call");
    
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
    
      try {
        const jsonResponseMatch = generatedText.match(/\{[\s\S]*\}/);
        const jsonContent = jsonResponseMatch ? jsonResponseMatch[0] : generatedText;
        
        const parsedJson = JSON.parse(jsonContent);
        
        if (apiEndpoint.cache_responses) {
          await supabase
            .from('api_endpoints')
            .update({ cached_response: JSON.stringify(parsedJson) })
            .eq('id', apiId);
        }
        
        responseStatus = apiEndpoint.status_code || 200;
        response = NextResponse.json(parsedJson, { 
          status: responseStatus 
        });
        return response; 
      } catch (parseError: any) {
        console.error("Error parsing AI response as JSON:", parseError);
        console.log("Raw AI response:", generatedText);
        
        responseStatus = 400;
        response = NextResponse.json({ 
          error: `Failed to parse response as JSON: ${parseError.message}`,
          raw_response: generatedText
        }, { status: responseStatus });
         return response; 
      }
    } catch (apiError: any) {
      console.error("Error from OpenAI API:", apiError);
      responseStatus = 502; 
      response = NextResponse.json({ error: `AI Provider error: ${apiError.message}` }, { status: responseStatus });
      return response; 
    }
  } catch (error: any) {
    console.error("Error in API route:", error);
    responseStatus = 500; 
    response = NextResponse.json({ error: error.message }, { status: responseStatus });
    return response; 
  } finally {
    const endTime = Date.now();
    logData.response_time_ms = endTime - startTime;
    logData.response_status = response?.status ?? responseStatus;

    // Only proceed with logging if we have essential data, especially user_id
    if (logData.api_endpoint_id && logData.user_id) {
      const finalLogData: ApiRequestLog = {
          api_endpoint_id: logData.api_endpoint_id,
          user_id: logData.user_id, // Now guaranteed not to be null here
          ip_address: logData.ip_address ?? null,
          user_agent: logData.user_agent ?? null,
          request_headers: logData.request_headers ?? null,
          request_body: logData.request_body ?? null,
          response_status: logData.response_status!,
          response_time_ms: logData.response_time_ms!
      };

      const { error: logError } = await supabase
        .from('api_requests')
        .insert(finalLogData);

      if (logError) {
        // Log detailed error for debugging, but don't crash the API response
        console.error('Failed to log API request:', {
            message: logError.message,
            details: logError.details,
            code: logError.code,
            hint: logError.hint,
            // Include relevant parts of logData for context
            api_endpoint_id: finalLogData.api_endpoint_id,
            user_id: finalLogData.user_id,
            response_status: finalLogData.response_status
        });
      } else {
        // --- Update usage quotas for this user and date ---
        try {
          const today = new Date().toISOString().split('T')[0];
          const { data: existingQuota, error: quotaError } = await supabase
            .from('usage_quotas')
            .select('requests_used')
            .eq('user_id', finalLogData.user_id)
            .eq('date', today)
            .single();
          const planLimit = 10;
          if (existingQuota) {
            const { error: updateError } = await supabase
              .from('usage_quotas')
              .update({ requests_used: existingQuota.requests_used + 1 })
              .eq('user_id', finalLogData.user_id)
              .eq('date', today);
            if (updateError) console.error('Failed to update usage quota:', updateError);
          } else {
            const { error: insertError } = await supabase
              .from('usage_quotas')
              .insert({ user_id: finalLogData.user_id, date: today, requests_used: 1, requests_limit: planLimit });
            if (insertError) console.error('Failed to insert usage quota:', insertError);
          }
        } catch (quotaErr) {
          console.error('Error updating usage quota:', quotaErr);
        }
      }
    } else {
        console.warn('Skipping API request logging due to missing api_endpoint_id or user_id.', {
            hasApiEndpointId: !!logData.api_endpoint_id,
            hasUserId: !!logData.user_id
        });
    }
  }
  return response ?? NextResponse.json({ error: 'Unexpected error occurred' }, { status: responseStatus });
}
