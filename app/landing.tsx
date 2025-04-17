"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppHost } from "@/config/site";


import BirdsAnimation from "@/components/ui/birds-animation";

export default function LandingPage() {

  return (
    <main className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden min-h-screen">
        {/* Birds Animation with moving birds */}
        {(() => {
          // Create 8 invisible refs as sitting points for birds
          const sitRef1 = useRef<HTMLDivElement>(null);
          const sitRef2 = useRef<HTMLDivElement>(null);
          const sitRef3 = useRef<HTMLDivElement>(null);
          const sitRef4 = useRef<HTMLDivElement>(null);
          const sitRef5 = useRef<HTMLDivElement>(null);
          const sitRef6 = useRef<HTMLDivElement>(null);
          const sitRef7 = useRef<HTMLDivElement>(null);
          const sitRef8 = useRef<HTMLDivElement>(null);
          // Render the birds animation and the invisible refs
          return (
            <>
              <BirdsAnimation sitRefs={[sitRef1, sitRef2, sitRef3, sitRef4, sitRef5, sitRef6, sitRef7, sitRef8] as unknown as React.RefObject<HTMLElement>[]} numBirds={6} />
              {/* Invisible sitting points for birds, distributed across the page */}
              <div ref={sitRef1} style={{position:'absolute', left:'10%', top:'15%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef2} style={{position:'absolute', left:'50%', top:'10%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef3} style={{position:'absolute', left:'85%', top:'20%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef4} style={{position:'absolute', left:'20%', top:'60%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef5} style={{position:'absolute', left:'70%', top:'55%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef6} style={{position:'absolute', left:'40%', top:'80%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef7} style={{position:'absolute', left:'80%', top:'75%', width:40, height:40, pointerEvents:'none'}} />
              <div ref={sitRef8} style={{position:'absolute', left:'5%', top:'75%', width:40, height:40, pointerEvents:'none'}} />
            </>
          );
        })()}

        <Image
          src="/landingbgimage.png"
          alt="Ghibli background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center py-20 md:py-32 w-full max-w-5xl mx-auto px-4">
          <div className="relative w-16 h-16 md:w-32 md:h-32 mb-2 animate-float">
            <Image
              src="/logo-light.png"
              alt="Spineless API Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="font-ghibli-bold text-4xl md:text-6xl text-white mb-6 max-w-3xl text-center">
            Accelerate Frontend Development with Realistic API Mocks
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 drop-shadow-md">
            Generate realistic API endpoints in seconds.<br className="hidden md:block" /> No more waiting for backend teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="rounded-full px-8 py-3 text-lg font-semibold ">
                Get started free
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold ">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY USE Spinliness API */}
      <section className="relative w-full flex flex-col items-center py-20 bg-[#f5ebd7]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-ghibli-bold text-3xl md:text-4xl text-[#6a9ab0] mb-10 text-center">
            Why Use Spineless API?
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Card className="flex-1 min-w-[260px] bg-white/70 border border-[#e6dcc2] shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#b0706a]">
                  <span>Without Spineless API</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-[#8a7a5a] space-y-2 text-base">
                  <li>Manually create mock JSON data</li>
                  <li>Set up local mock servers</li>
                  <li>Maintain mock data as requirements change</li>
                  <li>Development delays waiting for backend</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex-1 min-w-[260px] bg-white/90 border border-[#b9e6b0] shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#6a9ab0]">
                  <span>With Spineless API</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-[#4b7a5a] space-y-2 text-base">
                  <li>Define API schema once</li>
                  <li>Instantly get realistic mock data</li>
                  <li>Continue frontend development</li>
                  <li>Easily update as requirements change</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW Spinliness API WORKS */}
      <section className="relative w-full flex flex-col items-center py-20 bg-[#f7f3ea]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-ghibli-bold text-3xl md:text-4xl text-[#6a9ab0] mb-10 text-center">
            How Spineless API Works
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-[#b7c77d] text-[#4a5a2a]">1</Badge>
                <div>
                  <div className="font-bold text-[#4a5a2a]">Define your API schema</div>
                  <div className="text-[#6a9ab0]">Describe the data structure you expect</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge className="bg-[#b7c77d] text-[#4a5a2a]">2</Badge>
                <div>
                  <div className="font-bold text-[#4a5a2a]">Get your endpoint instantly</div>
                  <div className="text-[#6a9ab0]">A unique URL that returns AI-generated mock data</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge className="bg-[#b7c77d] text-[#4a5a2a]">3</Badge>
                <div>
                  <div className="font-bold text-[#4a5a2a]">Build your frontend</div>
                  <div className="text-[#6a9ab0]">Continue development without waiting</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Badge className="bg-[#b7c77d] text-[#4a5a2a]">4</Badge>
                <div>
                  <div className="font-bold text-[#4a5a2a]">Switch to real API when ready</div>
                  <div className="text-[#6a9ab0]">Simply change the endpoint URL</div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-[320px]">
              <Card className="bg-[#fdfbe8] border border-[#e6dcc2] shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-[#b0706a] text-base">API Schema Definition</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "id": "string(uuid)",
  "name": "string(name)",
  "email": "string(email)",
  "role": "string(enum=admin,user,guest)",
  "isActive": "boolean",
  "joinDate": "date(iso)",
  "lastLogin": "date(recent)",
  "preferences": {
    "theme": "string(enum=light,dark,system)",
    "notifications": "boolean"
  }
}`}
                  </pre>
                </CardContent>
              </Card>
              <Card className="bg-[#fdfbe8] border border-[#e6dcc2] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#6a9ab0] text-base">AI-Generated Mock Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs md:text-sm text-[#5a8a9f] bg-[#f8fbfd] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`{
  "id": "user_8f7d9b2a-e134-4dc3-b5e1-c1e7f3b0c8a9",
  "name": "Alex Johnson",
  "email": "alex.johnson@example.com",
  "role": "admin",
  "isActive": true,
  "joinDate": "2023-09-15T08:30:45Z",
  "lastLogin": "2024-03-29T14:22:18Z",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="relative w-full flex flex-col items-center py-20 bg-[#f5ebd7]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-ghibli-bold text-3xl md:text-4xl text-[#6a9ab0] mb-10 text-center">
            Key Features
          </h2>
          <p className="text-[#8a7a5a] mb-12 text-center text-lg">Everything you need to accelerate frontend development</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 border border-[#e6dcc2] shadow-md flex flex-col items-center p-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#f7c873]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <CardTitle className="text-[#b0706a]">Instant Setup</CardTitle>
              <CardContent className="text-[#8a7a5a] text-center">Create mock APIs in seconds, not hours. No complex configuration needed.</CardContent>
            </Card>
            <Card className="bg-white/80 border border-[#e6dcc2] shadow-md flex flex-col items-center p-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#4b7a5a]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C7.03 2 2.5 6.03 2.5 11c0 5.25 7.5 11 9.5 11s9.5-5.75 9.5-11c0-4.97-4.53-9-9.5-9zm0 13a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <CardTitle className="text-[#4b7a5a]">Realistic Data</CardTitle>
              <CardContent className="text-[#8a7a5a] text-center">AI-generated mock data that feels real and contextually relevant to your schema.</CardContent>
            </Card>
            <Card className="bg-white/80 border border-[#e6dcc2] shadow-md flex flex-col items-center p-6">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#b7c77d]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16-10V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8m16 0H4" />
              </svg>
              <CardTitle className="text-[#4a5a2a]">Developer Friendly</CardTitle>
              <CardContent className="text-[#8a7a5a] text-center">Simple API with flexible schema definitions. Built for developers, by developers.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GET STARTED IN MINUTES */}
      <section className="relative w-full flex flex-col items-center py-16 bg-[#f7f3ea]">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="font-ghibli-bold text-2xl md:text-3xl text-[#6a9ab0] mb-6 text-center">Get Started in Minutes</h3>
          <ul className="text-[#5a8a9f] text-lg space-y-3 list-disc ml-6">
            <li>Define your schema</li>
            <li>Generate your endpoint</li>
            <li>Start building</li>
          </ul>
        </div>
      </section>

      {/* EXAMPLE USAGE */}
      <section className="relative w-full flex flex-col items-center py-16 bg-[#f5ebd7]">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="font-ghibli-bold text-2xl md:text-3xl text-[#6a9ab0] mb-6 text-center">Example Usage</h3>
          <Card className="bg-[#f8fbfd] border border-[#d2e0e9] shadow-md">
            <CardContent>
              <pre className="text-xs md:text-sm text-[#5a8a9f] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
{`// 1. Define your API schema
const userSchema = {
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "createdAt": "date"
};

// 2. Use the Spineless API endpoint in your code
fetch("${AppHost}/api/spineless/asdawd-3ead-2q3e-ad2342/users")
  .then(response =&gt; response.json())
  .then(data =&gt; {
    // 3. Work with realistic mock data while backend is in development
    console.log(data);
    renderUserList(data);
  });`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative w-full flex flex-col items-center py-16 bg-gradient-to-b from-[#f5ebd7] to-[#e6dcc2]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-ghibli-bold text-2xl md:text-3xl text-[#6a9ab0] mb-6">Stop waiting for backend APIs</h3>
          <p className="text-lg text-[#8a7a5a] mb-8">Create your first Spinliness API in minutes and keep your frontend development moving</p>
          <Link href="/auth/signup">
            <Button className="rounded-full px-8 py-3 text-lg font-semibold">
              Start Building For Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer transparent={true} />
    </main>
  );
}
