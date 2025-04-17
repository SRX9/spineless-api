"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f5ebd7] overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="font-ghibli-bold text-4xl md:text-5xl mb-4 text-center">Spineless API Features</h1>
        <p className="text-xl md:text-2xl max-w-3xl text-center">
          Everything you need to accelerate your frontend development workflow.
        </p>
        </div>
      </div>

      {/* FEATURES GRID */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Feature 1 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Realistic Data</h3>
            <p className="text-[#5a8a9f] mb-4">
              Generate contextually appropriate mock data that matches your schema structure.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 16V4a2 2 0 0 1 2-2h11"></path>
                <path d="M5 14H4a2 2 0 1 0 0 4h1"></path>
                <path d="M22 18H11a2 2 0 1 0 0 4h11"></path>
                <path d="M15 12V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v7"></path>
                <path d="M17 7h1a2 2 0 0 1 2 2v1"></path>
                <path d="M11 12v-1a2 2 0 0 0-2-2H8"></path>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Persistent Endpoints</h3>
            <p className="text-[#5a8a9f] mb-4">
              Create unique, consistent API endpoints that return the same structured response.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
                <path d="M11 17v.01"></path>
                <path d="M7 14v.01"></path>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">AI-Powered</h3>
            <p className="text-[#5a8a9f] mb-4">
              Leverage AI to generate high-quality, realistic mock data for your APIs.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Instant Creation</h3>
            <p className="text-[#5a8a9f] mb-4">
              Choose the plan that&#39;s right for you. All plans include access to our core features.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Testing Ready</h3>
            <p className="text-[#5a8a9f] mb-4">
              Test your frontend against consistent, reliable mock data.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full">
            <div className="h-12 w-12 bg-[#6a9ab0]/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6a9ab0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Multiple Schemas</h3>
            <p className="text-[#5a8a9f] mb-4">
              Create and manage multiple API endpoints for different data needs.
            </p>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-ghibli-bold text-3xl md:text-4xl text-[#2d4a3e] mb-8 text-center">How It Works</h2>
          
          {/* Step 1 */}
          <div className="mb-24">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl mr-4">1</div>
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e]">Define Your Schema</h3>
            </div>
            <p className="text-[#5a8a9f] mb-6 pl-14">
              Create your API schema in JSON format. Specify the structure, data types, and any constraints for your mock API.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-14">
              <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#8fb3c7] text-white">Schema Definition</Badge>
                </div>
                <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "users": [
    {
      "id": "string:uuid",
      "name": "string:name",
      "email": "string:email",
      "role": "string:enum:admin,editor,viewer",
      "created_at": "date:past"
    }
  ]
}`}
                </pre>
              </Card>
              
              <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#6a9ab0] text-white">Generated Response</Badge>
                </div>
                <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "users": [
    {
      "id": "f7c5c8d1-9f3a-4b5c-8e7d-6f5a4b3c2d1e",
      "name": "Alex Thompson",
      "email": "alex@example.com",
      "role": "admin",
      "created_at": "2023-10-15T14:32:10Z"
    }
    // More users would appear here
  ]
}`}
                </pre>
              </Card>
            </div>
            
            <div className="mt-8 pl-14">
              <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#8fb3c7] text-white">Simple Object Example</Badge>
                </div>
                <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "product": {
    &#34;id&#34;: &#34;number:id&#34;,
    &#34;name&#34;: &#34;string:product&#34;,
    &#34;price&#34;: &#34;number:price&#34;,
    &#34;inStock&#34;: &#34;boolean&#34;,
    &#34;tags&#34;: &#34;array:string:3&#34;
  }
}`}
                </pre>
              </Card>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="mb-24">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl mr-4">2</div>
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e]">Generate Your API</h3>
            </div>
            <p className="text-[#5a8a9f] mb-6 pl-14">
              Our AI analyzes your schema and generates realistic mock data. You&#39;ll get a unique endpoint and a preview of the response.
            </p>
            <div className="pl-14 max-w-3xl">
              <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-[#6a9ab0] text-white">Your Unique API Endpoint</Badge>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#e5f0f5] rounded-lg text-[#2d4a3e] font-mono text-sm">
                  <span>https://spineless-api.app/mock/users-abc123</span>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 text-[#6a9ab0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-[#6a9ab0] text-white flex items-center justify-center font-ghibli-bold text-xl mr-4">3</div>
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e]">Use Your API</h3>
            </div>
            <p className="text-[#5a8a9f] mb-6 pl-14">
              Integrate the API endpoint into your frontend application. The data will be consistent across requests, allowing for reliable testing and development.
            </p>
            <div className="pl-14 max-w-3xl">
              <Card className="bg-[#f8fbfd] border-2 border-[#d2e0e9] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#8fb3c7] text-white">JavaScript Example</Badge>
                </div>
                <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`// In your frontend application
fetch('https://spineless-api.app/mock/users-abc123')
  .then(response => response.json())
  .then(data => {
    console.log(data.users);
    // Use the mock data in your app
  });`}
                </pre>
              </Card>
            </div>
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
