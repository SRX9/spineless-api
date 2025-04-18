"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#5C9EAD]" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-12 p-8 flex flex-col items-center bg-[#f5ebd7] shadow-xl">
        <p className="text-lg text-[#2d4a3e] font-semibold mb-4">You are not signed in.</p>
        <Button variant="default" onClick={() => window.location.href = "/auth/signin"}>
          Sign In
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12">
      <Card className="p-8 bg-[#f5ebd7] shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-20 h-20 text-4xl bg-[#bcd9ea] text-[#2d4a3e]">
            {user.email?.[0]?.toUpperCase()}
          </Avatar>
          <h2 className="text-2xl font-bold text-[#2d4a3e]">Profile</h2>
        </div>
        <Separator className="my-6 bg-[#bcd9ea]" />
        <div className="space-y-4">
          <div>
            <Label className="text-[#5C9EAD] text-sm">Email</Label>
            <div className="text-[#2d4a3e] text-lg font-medium">{user.email}</div>
          </div>
          <div>
            <Label className="text-[#5C9EAD] text-sm">User ID</Label>
            <div className="text-[#2d4a3e] text-lg font-mono break-all">{user.id}</div>
          </div>
        </div>
        <Separator className="my-6 bg-[#bcd9ea]" />
        <div className="flex justify-end">
          <Button variant="outline" onClick={signOut} className="text-[#2d4a3e] border-[#bcd9ea] hover:bg-[#bcd9ea]/40">
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
