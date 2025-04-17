"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Copy, Play, Code, ExternalLink } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { generateAIResponse } from "@/services/ai-service";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/ui/CodeBlock";
import Link from "next/link";
import React from "react";

export default function ApiDetailPage({ params }: { params: { id: string } }) {
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { id }: { id: string } = React.use(params as any);
  
  // Test response states
  const [testResponse, setTestResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveTestResponse, setLiveTestResponse] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createSupabaseBrowserClient();

  // Fetch API details
  const fetchApiDetails = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      // Get API endpoint details
      const { data: apiEndpoint, error: apiError } = await supabase
        .from('api_endpoints')
        .select('*')
        .eq('id', id)
        .single();

      if (apiError) throw apiError;
      
      if (!apiEndpoint) {
        setIsLoading(false);
        return;
      }
      
      // Get schema information
      const { data: schemaData, error: schemaError } = await supabase
        .from('api_schemas')
        .select('*')
        .eq('api_endpoint_id', id)
        .single();
      
      if (schemaError && schemaError.code !== 'PGRST116') throw schemaError;
      
      // Combine the data
      const combinedData = {
        ...apiEndpoint,
        schema: schemaData ? schemaData.schema_definition : apiEndpoint.response_body,
        status: apiEndpoint.is_active ? "active" : "inactive",
        created: apiEndpoint.created_at
      };
      
      setApiData(combinedData);
      const formattedPath = apiEndpoint.endpoint_path.startsWith('/') ? apiEndpoint.endpoint_path.substring(1) : apiEndpoint.endpoint_path;
      setApiEndpoint(`${window.location.origin}/api/spineless/${apiEndpoint.id}/${formattedPath}`);
    } catch (error: any) {
      console.error("Error fetching API details:", error);
      toast({
        title: "Error loading API details",
        description: error.message || "Failed to load API details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a test response
  const generateTestResponse = async () => {
    if (isGenerating || !apiData) return;
    
    setIsGenerating(true);
    try {
      const response = await generateAIResponse({
        name: apiData.name,
        description: apiData.description,
        schema: typeof apiData.schema === 'string' ? JSON.parse(apiData.schema) : apiData.schema,
      });
      
      setTestResponse(response.response);
      
      toast({
        title: "Test response generated",
        description: "Sample response based on the schema has been generated.",
      });
    } catch (error: any) {
      console.error("Error generating test response:", error);
      toast({
        title: "Error generating response",
        description: error.message || "There was an error generating the test response.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Test the live API
  const testLiveApi = async () => {
    if (isTesting || !apiData) return;
    
    setIsTesting(true);
    try {
      const formattedPath = apiData.endpoint_path.startsWith('/') ? apiData.endpoint_path.substring(1) : apiData.endpoint_path;
      const apiUrl = `/api/spineless/${apiData.id}/${formattedPath}`;
      
      const response = await fetch(apiUrl, {
        method: apiData.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setLiveTestResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Live API tested",
        description: "Response from the live API endpoint received.",
      });
    } catch (error: any) {
      console.error("Error testing live API:", error);
      toast({
        title: "Error testing API",
        description: error.message || "There was an error testing the live API endpoint.",
        variant: "destructive",
      });
      setLiveTestResponse(JSON.stringify({ error: "Failed to fetch response from API" }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  // Copy endpoint to clipboard
  const copyEndpoint = () => {
    navigator.clipboard.writeText(apiEndpoint);
    toast({
      title: "Endpoint copied",
      description: "API endpoint URL copied to clipboard.",
    });
  };

  // Load API data on component mount
  useEffect(() => {
    if (!loading && !user) {
      setIsLoading(false);
      router.push("/auth/signin");
      return;
    }
    if (user) {
      fetchApiDetails();
    }
    // eslint-disable-next-line
  }, [loading, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#5C9EAD]" />
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold ">API not found</h2>
        <p className="text-muted-foreground mt-2">The API you're looking for doesn't exist or you don't have access to it.</p>
        <Button className="mt-4 " asChild>
          <Link href="/dashboard/apis">Go back to API List</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {apiData.name}
          </h1>
          <p className="text-white">{apiData.description}</p>
        </div>
        <Badge
          variant={apiData.status === "active" ? "secondary" : "outline"}
        >
          {apiData.status}
        </Badge>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-ghibli text-[#2D5362]">
                API Details
              </CardTitle>
              <CardDescription>
                Information about your Spineless API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-[#2D5362]">API ID</p>
                  <p className="text-sm text-muted-foreground">{apiData.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D5362]">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(apiData.created).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D5362]">Method</p>
                  <p className="text-sm text-muted-foreground">
                    {apiData.method}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D5362]">
                    Status Code
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {apiData.status_code}
                  </p>
                </div>
                {apiData.delay_ms > 0 && (
                  <div>
                    <p className="text-sm font-medium text-[#2D5362]">
                      Response Delay
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {apiData.delay_ms}ms
                    </p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-[#2D5362]">Endpoint</p>
                  <div className="flex items-center mt-1">
                    <code className="text-xs bg-[#5C9EAD]/10 p-2 rounded flex-1 overflow-x-auto">
                      {apiEndpoint}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-[#2D5362]"
                      onClick={copyEndpoint}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy endpoint</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle className="font-ghibli text-[#2D5362]">
                Response Schema
              </CardTitle>
              <CardDescription>
                The structure of the data returned by this API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={
                  typeof apiData.schema === "object"
                    ? JSON.stringify(apiData.schema, null, 2)
                    : apiData.schema
                }
                language="json"
                title="Response Schema"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle className="font-ghibli text-[#2D5362]">
                Test Your API
              </CardTitle>
              <CardDescription>
                Generate a sample response or test the live API endpoint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-[#2D5362]">
                  AI-Generated Sample
                </h3>
                <Button
                  onClick={generateTestResponse}
                  disabled={isGenerating}
                  className="mb-4 bg-[#5C9EAD] hover:bg-[#5C9EAD]/90"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="h-4 w-4 mr-2" />
                      Generate Sample Response
                    </>
                  )}
                </Button>

                {testResponse ? (
                  <CodeBlock
                    code={testResponse}
                    language="json"
                    title="AI-Generated Sample Response"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 border border-dashed rounded-md bg-[#5C9EAD]/5 border-[#5C9EAD]/20">
                    <p className="text-muted-foreground">
                      Click "Generate Sample Response" to see a sample
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-[#5C9EAD]/20 pt-6">
                <h3 className="text-lg font-medium mb-3 text-[#2D5362]">
                  Live API Test
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Test the deployed API endpoint at{" "}
                  <code className="bg-[#5C9EAD]/10 px-1 py-0.5 rounded">
                    {apiEndpoint}
                  </code>
                </p>

                <Button
                  onClick={testLiveApi}
                  disabled={isTesting}
                  className="mb-4"
                  variant="outline"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing live API...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Test Live API Endpoint
                    </>
                  )}
                </Button>

                {liveTestResponse ? (
                  <CodeBlock
                    code={liveTestResponse}
                    language="json"
                    title="Live API Response"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 border border-dashed rounded-md bg-[#5C9EAD]/5 border-[#5C9EAD]/20">
                    <p className="text-muted-foreground">
                      Click "Test Live API Endpoint" to see the actual response
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card className="">
            <CardHeader>
              <CardTitle className="font-ghibli text-[#2D5362]">
                API Usage
              </CardTitle>
              <CardDescription>
                How to use this API in your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#2D5362] mb-2">
                  Code Example
                </p>
                <CodeBlock
                  code={`// Using fetch
fetch("${apiEndpoint}", {
  method: "${apiData.method}",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));`}
                  language="javascript"
                  title="JavaScript Example"
                />
              </div>

              <div className="mt-4">
                <Button variant="outline" className="gap-2 border-[#5C9EAD]/30">
                  <ExternalLink className="h-4 w-4" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button
          variant="outline"
          className="border-[#5C9EAD]/30"
          onClick={() => router.push("/dashboard/apis")}
        >
          Back to APIs
        </Button>
      </div>
    </div>
  );
}
