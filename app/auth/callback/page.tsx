"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-ghibli-primary">
          <Card className="w-full max-w-md text-center p-8 bg-ghibli-surface shadow-ghibli">
            <Loader className="mx-auto mb-4 animate-spin" />
            <p className="text-ghibli-accent">Preparing confirmation page...</p>
          </Card>
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setStatus("error");
      setError("Missing confirmation code.");
      return;
    }
    const supabase = createClientComponentClient();
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setStatus("error");
        setError(error.message);
      } else {
        setStatus("success");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000);
      }
    });
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-ghibli-primary">
      <Card className="w-full max-w-md text-center p-8 bg-ghibli-surface shadow-ghibli">
        {status === "loading" && (
          <>
            <Loader className="mx-auto mb-4 animate-spin" />
            <p className="text-ghibli-accent">Confirming your email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <img
              src="/ghibli/soot-sprite.png"
              alt="Soot Sprite"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-ghibli mb-2 text-ghibli-accent">
              Welcome to Spineless API!
            </h2>
            <p className="mb-2">
              Your email has been confirmed. Redirecting to your dashboard...
            </p>
            <Button
              className="mt-4"
              onClick={() => router.replace("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <img
              src="/ghibli/no-face-sad.png"
              alt="Error"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-ghibli mb-2 text-ghibli-error">
              Something went wrong
            </h2>
            <p className="mb-2">{error}</p>
            <Button className="mt-4" onClick={() => router.replace("/signin")}>
              Back to Sign In
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
