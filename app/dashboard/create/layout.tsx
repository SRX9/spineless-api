import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create API | Spineless API",
  description: "Create a new mock API with Spineless API - Generate realistic test data for frontend development",
};

export default function CreateApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      {children}
    </div>
  );
}
