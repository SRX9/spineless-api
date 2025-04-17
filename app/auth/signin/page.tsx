"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router, supabase.auth]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
      setLoading(false);
    }
  };



  const handleGithubSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: "user:email",
        },
      });

      if (error) {
        throw error;
      }
      // Don't set loading to false here as we're redirecting
    } catch (error: any) {
      console.error("GitHub sign in error:", error);
      setError(error.message || "An error occurred with GitHub sign in");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-md flex justify-start mb-4">
        <Link href="/" className="text-white flex items-center gap-1 hover:opacity-80 transition-opacity drop-shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          <span>Back to Home</span>
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="relative w-32 h-32">
          <Image
            src="/spinelessapilogo.png"
            alt="Spineless API"
            fill
            className="object-contain animate-float"
          />
        </div>
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          Welcome Back
        </h1>
        <p className="text-white/80 text-center max-w-xs drop-shadow-md">
          Sign in to continue your journey with Spineless API
        </p>
      </div>

      {error && (
        <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailSignIn} className="space-y-4 w-full max-w-md">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/50 backdrop-blur-sm border-none placeholder:text-gray-500 shadow-md"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/50 backdrop-blur-sm border-none placeholder:text-gray-500 shadow-md"
          />
        </div>
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full "
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="relative my-6 w-full max-w-md">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-sm text-white drop-shadow-md">
          OR
        </span>
      </div>

      <div className="space-y-3 w-full max-w-md">
        <Button
          onClick={handleGithubSignIn}
          disabled={loading}
          variant="outline"
          className="w-full "
        >
          <GithubIcon className="w-5 h-5 mr-2" />
          Continue with GitHub
        </Button>
      </div>

      <div className="mt-6 text-center w-full max-w-md">
        <p className="text-white drop-shadow-md">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className=" font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
