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

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6a9ab0]">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function PricingPage() {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
          <h1 className="font-ghibli-bold text-4xl md:text-5xl mb-4 text-center">Simple, Transparent Pricing</h1>
          <p className="text-xl md:text-2xl max-w-3xl text-center">
            Choose the plan that&#39;s right for you. All plans include access to our core features.
          </p>
        </div>
      </div>

      {/* PRICING CARDS */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Free Plan */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full relative overflow-hidden">
            <div className="mb-6">
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Free</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="font-ghibli-bold text-4xl text-[#2d4a3e]">$0</span>
                <span className="text-[#5a8a9f] mb-1">/month</span>
              </div>
              <p className="text-[#5a8a9f] mb-6">
                Perfect for trying out the platform or small projects.
              </p>
              <Separator className="mb-6 bg-[#d2e0e9]" />
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-[#5a8a9f]">
                <CheckIcon /> Up to 5 mock APIs
              </li>
              <li className="flex items-center gap-2 text-[#5a8a9f]">
                <CheckIcon /> 10 requests per day
              </li>
              <li className="flex items-center gap-2 text-[#5a8a9f]">
                <CheckIcon /> Basic AI data generation
              </li>
              <li className="flex items-center gap-2 text-[#5a8a9f]">
                <CheckIcon /> Standard support
              </li>
              <li className="flex items-center gap-2 text-[#5a8a9f]">
                <CheckIcon /> Public endpoints only
              </li>
            </ul>
            
            <Button className="w-full rounded-full py-6  font-semibold text-lg shadow-md">
              Get Started
            </Button>
          </Card>
          {/* Developer Plan */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full relative overflow-hidden">
            <div className="mb-6">
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Developer</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="font-ghibli-bold text-4xl text-[#2d4a3e]">$9</span>
                <span className="text-[#5a8a9f] mb-1">/month</span>
              </div>
              <p className="text-[#5a8a9f] mb-6">Great for developers needing higher limits.</p>
              <Separator className="mb-6 bg-[#d2e0e9]" />
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Up to 100 mock APIs</li>
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> 100 requests per day</li>
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Advanced AI data generation</li>
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Priority support</li>
            </ul>
            <Button disabled className="w-full rounded-full py-6  font-semibold text-lg shadow-md">
              Coming Soon
            </Button>
          </Card>
          {/* Custom Enterprise Plan */}
          <Card className="bg-white border-2 border-[#d2e0e9] p-8 flex flex-col hover:shadow-lg transition-all h-full relative overflow-hidden">
            <div className="mb-6">
              <h3 className="font-ghibli-bold text-2xl text-[#2d4a3e] mb-2">Enterprise</h3>
              <p className="text-[#5a8a9f] mb-6">Custom solutions for large organizations.</p>
              <Separator className="mb-6 bg-[#d2e0e9]" />
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Unlimited mock APIs</li>
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Dedicated account manager</li>
              <li className="flex items-center gap-2 text-[#5a8a9f]"><CheckIcon /> Custom integrations</li>
            </ul>
            <Link href="/contact">
              <Button className="w-full rounded-full py-6  font-semibold text-lg shadow-md">
                Contact Sales
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full mb-16">
        <h2 className="font-ghibli-bold text-3xl text-[#2d4a3e] mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <Card className="bg-white border-2 border-[#d2e0e9] overflow-hidden">
            <button 
              className="w-full p-6 flex justify-between items-center text-left"
              onClick={() => toggleFaq(0)}
            >
              <h3 className="font-ghibli-bold text-xl text-[#2d4a3e]">What happens if I exceed my monthly requests?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`text-[#6a9ab0] transition-transform ${faqOpen[0] ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {faqOpen[0] && (
              <div className="px-6 pb-6 text-[#5a8a9f]">
                <p>If you exceed your monthly request limit, your APIs will continue to function but at a reduced rate. You can upgrade your plan at any time to increase your limit.</p>
              </div>
            )}
          </Card>

          {/* FAQ Item 2 */}
          <Card className="bg-white border-2 border-[#d2e0e9] overflow-hidden">
            <button 
              className="w-full p-6 flex justify-between items-center text-left"
              onClick={() => toggleFaq(1)}
            >
              <h3 className="font-ghibli-bold text-xl text-[#2d4a3e]">Can I upgrade or downgrade at any time?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`text-[#6a9ab0] transition-transform ${faqOpen[1] ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {faqOpen[1] && (
              <div className="px-6 pb-6 text-[#5a8a9f]">
                <p>Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated based on the time remaining in your current billing cycle.</p>
              </div>
            )}
          </Card>

          {/* FAQ Item 3 */}
          <Card className="bg-white border-2 border-[#d2e0e9] overflow-hidden">
            <button 
              className="w-full p-6 flex justify-between items-center text-left"
              onClick={() => toggleFaq(2)}
            >
              <h3 className="font-ghibli-bold text-xl text-[#2d4a3e]">Do you offer custom plans for larger organizations?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`text-[#6a9ab0] transition-transform ${faqOpen[2] ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {faqOpen[2] && (
              <div className="px-6 pb-6 text-[#5a8a9f]">
                <p>Yes, we offer custom enterprise plans for organizations with specific requirements. Please contact our sales team for more information.</p>
              </div>
            )}
          </Card>

          {/* FAQ Item 4 */}
          <Card className="bg-white border-2 border-[#d2e0e9] overflow-hidden">
            <button 
              className="w-full p-6 flex justify-between items-center text-left"
              onClick={() => toggleFaq(3)}
            >
              <h3 className="font-ghibli-bold text-xl text-[#2d4a3e]">Is there a long-term contract?</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`text-[#6a9ab0] transition-transform ${faqOpen[3] ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {faqOpen[3] && (
              <div className="px-6 pb-6 text-[#5a8a9f]">
                <p>No, all of our plans are billed monthly and you can cancel at any time. There are no long-term commitments required.</p>
              </div>
            )}
          </Card>
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