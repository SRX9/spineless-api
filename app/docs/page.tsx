"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f5ebd7] overflow-x-hidden">
      <Navbar />
      {/* HEADER */}
      <div className="w-full relative h-80 px-6 flex flex-col items-center justify-center text-white overflow-hidden">
        <Image
          src="/landingbgimage.png"
          alt="Ghibli background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="font-ghibli-bold text-4xl md:text-5xl mb-4 text-center">Documentation</h1>
        <p className="text-xl md:text-2xl max-w-3xl text-center">
          Learn how to use Spineless API to accelerate your frontend development workflow.
        </p>
        </div>
      </div>

      {/* DOCS CONTENT */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-[#d2e0e9] rounded-lg p-6 shadow-md">
              <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Contents</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#getting-started" className="text-[#6a9ab0] hover:text-[#2d4a3e] transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#api-creation" className="text-[#6a9ab0] hover:text-[#2d4a3e] transition-colors">
                    API Creation
                  </a>
                </li>
                <li>
                  <a href="#integration" className="text-[#6a9ab0] hover:text-[#2d4a3e] transition-colors">
                    Integration
                  </a>
                </li>
                <li>
                  <a href="#advanced" className="text-[#6a9ab0] hover:text-[#2d4a3e] transition-colors">
                    Advanced
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Getting Started */}
            <section id="getting-started" className="mb-16">
              <Card className="bg-white border-2 border-[#d2e0e9] p-8">
                <h2 className="font-ghibli-bold text-3xl text-[#2d4a3e] mb-6">Getting Started with Spineless API</h2>
                <p className="text-[#5a8a9f] mb-8 text-lg">
                  Spineless API helps you create realistic mock APIs to accelerate your frontend development. Follow these steps to get started:
                </p>

                <div className="space-y-10">
                  {/* Step 1 */}
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-2">Create an Account</h3>
                      <p className="text-[#5a8a9f]">
                        Sign up for a free Spineless API account to get access to the platform. You'll need to provide your email and create a password.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-2">Create Your First API</h3>
                      <p className="text-[#5a8a9f]">
                        After logging in, navigate to the dashboard and click "Create New API". You'll need to provide a name, description, and schema for your API.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-2">Define Your Schema</h3>
                      <p className="text-[#5a8a9f]">
                        Use our schema editor to define the structure of your API response. You can specify data types, constraints, and relationships.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-2">Generate and Test</h3>
                      <p className="text-[#5a8a9f]">
                        Once your schema is defined, click "Generate" to create your mock API. You'll get a unique endpoint URL that you can use in your frontend application.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* API Creation */}
            <section id="api-creation" className="mb-16">
              <Card className="bg-white border-2 border-[#d2e0e9] p-8">
                <h2 className="font-ghibli-bold text-3xl text-[#2d4a3e] mb-6">API Creation Guide</h2>
                <p className="text-[#5a8a9f] mb-8 text-lg">
                  Learn how to create effective API schemas that generate realistic mock data.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Schema Structure</h3>
                    <p className="text-[#5a8a9f] mb-4">
                      A Spineless API schema consists of a JSON object with the following properties:
                    </p>
                    <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6 mb-4">
                      <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "property": "data_type",   // Simple property
  "object": {                // Nested object
    "property": "data_type"
  },
  "array": [                 // Array of items
    {
      "property": "data_type"
    }
  ]
},
"count": number              // For arrays, how many items to generate`}
                      </pre>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Supported Data Types</h3>
                    <p className="text-[#5a8a9f] mb-4">
                      Spineless API supports the following data types:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#f8fbfd] rounded-lg p-4 border-2 border-[#d2e0e9]">
                        <ul className="space-y-2 text-[#5a8a9f]">
                          <li><span className="font-semibold">string:</span> A basic string value</li>
                          <li><span className="font-semibold">string:name:</span> A realistic person name</li>
                          <li><span className="font-semibold">string:email:</span> A valid email address</li>
                          <li><span className="font-semibold">string:uuid:</span> A UUID string</li>
                          <li><span className="font-semibold">string:enum:value1,value2:</span> One of the provided values</li>
                          <li><span className="font-semibold">number:</span> A random number</li>
                        </ul>
                      </div>
                      <div className="bg-[#f8fbfd] rounded-lg p-4 border-2 border-[#d2e0e9]">
                        <ul className="space-y-2 text-[#5a8a9f]">
                          <li><span className="font-semibold">number:integer:</span> A random integer</li>
                          <li><span className="font-semibold">number:range:min,max:</span> A number within the specified range</li>
                          <li><span className="font-semibold">boolean:</span> A random boolean value</li>
                          <li><span className="font-semibold">date:</span> A random date in ISO format</li>
                          <li><span className="font-semibold">date:past:</span> A date in the past</li>
                          <li><span className="font-semibold">date:future:</span> A date in the future</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Integration */}
            <section id="integration" className="mb-16">
              <Card className="bg-white border-2 border-[#d2e0e9] p-8">
                <h2 className="font-ghibli-bold text-3xl text-[#2d4a3e] mb-6">Integrating with Your Application</h2>
                <p className="text-[#5a8a9f] mb-8 text-lg">
                  Once you've created your mock API, it's time to integrate it with your frontend application.
                </p>

                <Tabs defaultValue="fetch" className="w-full">
                  <TabsList className="mb-6 bg-[#f8fbfd] p-1 border-2 border-[#d2e0e9]">
                    <TabsTrigger value="fetch" className="data-[state=active]:bg-[#6a9ab0] data-[state=active]:text-white">Fetch API</TabsTrigger>
                    <TabsTrigger value="axios" className="data-[state=active]:bg-[#6a9ab0] data-[state=active]:text-white">Axios</TabsTrigger>
                    <TabsTrigger value="react-query" className="data-[state=active]:bg-[#6a9ab0] data-[state=active]:text-white">React Query</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="fetch">
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Using Fetch API</h3>
                      <p className="text-[#5a8a9f] mb-4">
                        Here's how to use the Fetch API to call your mock API:
                      </p>
                      <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                        <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`fetch('https://spineless-api.app/mock/your-endpoint-id')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Use the data in your application
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });`}
                        </pre>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="axios">
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Using Axios</h3>
                      <p className="text-[#5a8a9f] mb-4">
                        If you prefer Axios, here's how to use it:
                      </p>
                      <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                        <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`import axios from 'axios';

axios.get('https://spineless-api.app/mock/your-endpoint-id')
  .then(response => {
    console.log(response.data);
    // Use the data in your application
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });`}
                        </pre>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="react-query">
                    <div>
                      <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Using React Query</h3>
                      <p className="text-[#5a8a9f] mb-4">
                        For React applications, React Query is an excellent choice:
                      </p>
                      <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                        <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('https://spineless-api.app/mock/your-endpoint-id');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const YourComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mockData'],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      {/* Use your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};`}
                        </pre>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </section>

            {/* Advanced */}
            <section id="advanced" className="mb-16">
              <Card className="bg-white border-2 border-[#d2e0e9] p-8">
                <h2 className="font-ghibli-bold text-3xl text-[#2d4a3e] mb-6">Advanced Features</h2>
                <p className="text-[#5a8a9f] mb-8 text-lg">
                  Explore advanced features to get the most out of Spineless API.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Custom Response Headers</h3>
                    <p className="text-[#5a8a9f] mb-4">
                      You can specify custom headers for your API responses by adding a headers object to your schema:
                    </p>
                    <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                      <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "data": {
    // Your regular schema here
  },
  "headers": {
    "X-Custom-Header": "Custom Value",
    "Cache-Control": "max-age=3600"
  }
}`}
                      </pre>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Response Delay</h3>
                    <p className="text-[#5a8a9f] mb-4">
                      Simulate network latency by adding a delay to your API responses:
                    </p>
                    <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                      <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "data": {
    // Your regular schema here
  },
  "delay": 1500  // Delay in milliseconds
}`}
                      </pre>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-ghibli-bold text-xl text-[#2d4a3e] mb-4">Error Simulation</h3>
                    <p className="text-[#5a8a9f] mb-4">
                      Test how your application handles errors by simulating error responses:
                    </p>
                    <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                      <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "error": {
    "status": 404,
    "message": "Resource not found"
  }
}`}
                      </pre>
                    </Card>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-28 px-6 bg-[#6a9ab0] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-ghibli-bold text-3xl md:text-4xl mb-4">Ready to accelerate your development?</h2>
          <p className="text-xl mb-8">Start creating realistic API mocks in seconds.</p>
          <Link href="/">
            <Button className="rounded-full px-10 py-7 text-xl font-semibold bg-[#f5ebd7] text-[#2d4a3e] hover:bg-white shadow-md">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
