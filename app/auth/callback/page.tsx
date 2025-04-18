"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function AuthCallbackPage() {
  return <Content />;
}

function Content() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghibli-primary">
      <Card className="w-full max-w-md text-center p-8 bg-ghibli-surface shadow-ghibli">
        <p className="text-ghibli-accent text-xl mb-4">Confirming email...</p>
        <div className="flex justify-center gap-4 text-ghibli-accent text-3xl font-ghibli">
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>
        <p className="mt-6 text-ghibli-accent">Redirecting to Login. Please Login with your Credentials</p>
      </Card>
    </div>
  );
}
