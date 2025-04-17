import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication - Spineless API",
  description: "Sign in or sign up to Spineless API",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/landingbgimage.png')"
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-contain bg-bottom bg-repeat-x" style={{ backgroundImage: "url('/grass.png')" }} />
      <div className="z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
