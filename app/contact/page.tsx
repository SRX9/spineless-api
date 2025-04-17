"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase";

export default function ContactPage() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { error } = await supabase
      .from("contact")
      .insert({ name, email, message });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f5ebd7] overflow-hidden">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-80 w-full bg-cover bg-center" style={{ backgroundImage: "url('/landingbgimage.png')" }}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-ghibli-bold text-4xl text-white mb-2">Get In Touch</h1>
          <p className="text-white/90 max-w-xl text-lg">We’d love to hear from you. Fill out the form below and we’ll get back to you ASAP.</p>
        </div>
      </div>
      {/* Form Section */}
      <div className="relative -mt-24 z-10 flex justify-center px-6 pb-20">
        <Card className="w-full max-w-2xl p-10 ">

          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success && <div className="text-green-600 mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white border-none placeholder:text-gray-500" />
            </div>
            <div>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white border-none placeholder:text-gray-500" />
            </div>
            <div>
              <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-white border-none placeholder:text-gray-500" rows={5} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? "Sending..." : "Send Message"}</Button>
          </form>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
