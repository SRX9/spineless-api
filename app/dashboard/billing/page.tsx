import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function BillingComingSoon() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-10">
      <div className="z-10 w-full max-w-md">
        <Card className="bg-white/70 dark:bg-slate-900/70 border-none shadow-xl rounded-3xl p-8 flex flex-col items-center gap-4">

          <h1 className="text-3xl font-ghibli text-green-700 mb-2">Coming Soon</h1>
          <p className="text-center text-lg text-slate-700 dark:text-slate-200 mb-4">
            The billing dashboard is on its way!<br />
            Soon you'll be able to manage your subscription and view invoices here.
          </p>
        </Card>
      </div>
    </div>
  );
}
