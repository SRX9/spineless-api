"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from "@/components/ui/CodeBlock";
import { generateAIResponse } from "@/services/ai-service";

export default function CreateApiPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("GET");
  const [endpointPath, setEndpointPath] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [delay, setDelay] = useState(0);
  const [schemaText, setSchemaText] = useState(`{
  "id": "string",
  "name": "string",
  "email": "string",
  "comments": [
    {
      "id": "string",
      "text": "string"
    }
  ],
  "profile": {
    "bio": "string",
    "social": {
      "twitter": "string",
      "github": "string"
    }
  }
}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResponse, setTestResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [schemaError, setSchemaError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usageLimit, setUsageLimit] = useState({
    total: 0,
    limit: 5,
    limitReached: false
  });

  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  // Validate the JSON schema
  const validateSchema = (schemaStr: string) => {
    try {
      const schema = JSON.parse(schemaStr);
      setSchemaError("");
      return schema;
    } catch (error) {
      setSchemaError("Invalid JSON format. Please check for syntax errors.");
      return null;
    }
  };

  // Generate a test response based on the schema
  const generateTestResponse = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const schema = validateSchema(schemaText);
      if (!schema) {
        setIsGenerating(false);
        return;
      }
      
      const response = await generateAIResponse({
        name,
        description,
        schema,
      });
      
      setTestResponse(response.response);
      
      toast({
        title: "Test response generated",
        description: "Sample response based on your schema has been generated.",
      });
    } catch (error) {
      console.error("Error generating test response:", error);
      toast({
        title: "Error generating response",
        description: "There was an error generating the test response.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create an API.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const schema = validateSchema(schemaText);
      if (!schema) {
        setIsSubmitting(false);
        return;
      }
      
      // Format the endpoint path
      const formattedPath = endpointPath.startsWith('/') 
        ? endpointPath.toLowerCase() 
        : `/${endpointPath.toLowerCase()}`;
      
      // Create the API endpoint
      const { data, error } = await supabase
        .from('api_endpoints')
        .insert({
          user_id: user.id,
          name,
          description,
          endpoint_path: formattedPath,
          method: method.toUpperCase(),
          response_type: 'JSON',
          response_body: schema,
          status_code: statusCode,
          delay_ms: delay,
          is_active: true
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Create the API schema
      if (data) {
        const { error: schemaError } = await supabase
          .from('api_schemas')
          .insert({
            api_endpoint_id: data.id,
            schema_definition: schema
          });
        
        if (schemaError) throw schemaError;
      }
      
      toast({
        title: "API created successfully",
        description: "Your Spineless API is now ready to use.",
      });
      
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/dashboard/apis");
      }, 800);
    } catch (error: any) {
      console.error("Error creating API:", error);
      setIsSubmitting(false);
      toast({
        title: "Error creating API",
        description: error.message || "There was an error creating your API. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#5C9EAD]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create a Spineless API
        </h1>
        <p className="text-white pt-1">
          Define your API behavior and response schema.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 p-6  rounded-xl bg-background"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#2D5362]">
              API Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., User Profile API"
              required
              className="border-[#5C9EAD]/20 focus-visible:ring-[#5C9EAD]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#2D5362]">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your API does and its purpose..."
              required
              rows={3}
              className="border-[#5C9EAD]/20 focus-visible:ring-[#5C9EAD]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method" className="text-[#2D5362]">
                HTTP Method
              </Label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="flex h-10 w-full rounded-md border border-[#5C9EAD]/20 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9EAD] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint" className="text-[#2D5362]">
                Endpoint Path
              </Label>
              <Input
                id="endpoint"
                value={endpointPath}
                onChange={(e) => setEndpointPath(e.target.value)}
                placeholder="/users"
                required
                className="border-[#5C9EAD]/20 focus-visible:ring-[#5C9EAD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statusCode" className="text-[#2D5362]">
                Status Code
              </Label>
              <Input
                id="statusCode"
                type="number"
                value={statusCode}
                onChange={(e) => setStatusCode(parseInt(e.target.value))}
                min={100}
                max={599}
                required
                className="border-[#5C9EAD]/20 focus-visible:ring-[#5C9EAD]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay" className="text-[#2D5362]">
                Response Delay (ms)
              </Label>
              <Input
                id="delay"
                type="number"
                value={delay}
                onChange={(e) => setDelay(parseInt(e.target.value))}
                min={0}
                max={10000}
                required
                className="border-[#5C9EAD]/20 focus-visible:ring-[#5C9EAD]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schema" className="text-[#2D5362]">
              Response Schema (JSON)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Define the structure of your API response. You can use complex
              nested objects and arrays.
            </p>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-2 bg-[#5C9EAD]/20">
                <TabsTrigger value="editor">JSON Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <CodeBlock
                  code={schemaText}
                  language="json"
                  mode="edit"
                  onChange={(val: string) => {
                    setSchemaText(val);
                    setSchemaError("");
                  }}
                />
                {schemaError && (
                  <p className="text-sm text-destructive mt-1">{schemaError}</p>
                )}
              </TabsContent>
              <TabsContent value="preview">
                <div className="h-64 overflow-auto bg-[#5C9EAD]/5 rounded-md">
                  <CodeBlock code={schemaText} />
                </div>
              </TabsContent>
              <TabsContent value="help">
                <div className="h-64 overflow-auto bg-[#5C9EAD]/5 rounded-md p-4">
                  <h4 className="font-medium mb-2 text-[#2D5362]">
                    Schema Format Examples
                  </h4>
                  <p className="mb-2 text-sm">
                    You can define complex nested structures:
                  </p>
                  <CodeBlock
                    code={`{
  "user": {
    "id": "string",
    "name": "string",
    "posts": [
      {
        "id": "string",
        "title": "string",
        "comments": [
          {
            "id": "string",
            "text": "string"
          }
        ]
      }
    ]
  }
}`}
                    title="Nested Objects & Arrays"
                  />
                  <p className="mt-4 mb-2 text-sm">Available types:</p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>"string" - Text values</li>
                    <li>"number" - Numeric values</li>
                    <li>"boolean" - true/false values</li>
                    <li>"array" - Lists of items</li>
                    <li>"object" - Nested structures</li>
                    <li>"date" - Date strings</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label className="text-[#2D5362]">Test Response</Label>
            <div className="bg-[#5C9EAD]/5 rounded-md min-h-[100px] mb-2">
              {testResponse ? (
                <CodeBlock code={testResponse} />
              ) : (
                <div className="flex items-center justify-center h-20 text-muted-foreground">
                  Click "Generate Test Response" to see a sample
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={generateTestResponse}
              disabled={
                isGenerating || !schemaText.trim() || !name || !description
              }
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Test Response"
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/apis")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !name ||
              !description ||
              !schemaText ||
              !user ||
              !endpointPath
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create API"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
