"use client"

import React from "react";


import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { CloudElement, GrassBushElement, FlowerCropElement } from "@/components/ui/nature-elements";
import { BirdsAnimation } from "@/components/ui/birds-animation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Refs for all sit elements (clouds, bushes, flowers)
  const cloud1Ref = React.useRef<HTMLDivElement>(null);
  const cloud2Ref = React.useRef<HTMLDivElement>(null);
  const bush1Ref = React.useRef<HTMLDivElement>(null);
  const bush2Ref = React.useRef<HTMLDivElement>(null);
  const bush3Ref = React.useRef<HTMLDivElement>(null);
  const bush4Ref = React.useRef<HTMLDivElement>(null);
  const bush5Ref = React.useRef<HTMLDivElement>(null);
  const bush6Ref = React.useRef<HTMLDivElement>(null);
  const bush7Ref = React.useRef<HTMLDivElement>(null);
  const flower1Ref = React.useRef<HTMLDivElement>(null);
  const flower2Ref = React.useRef<HTMLDivElement>(null);
  const flower3Ref = React.useRef<HTMLDivElement>(null);
  const flower4Ref = React.useRef<HTMLDivElement>(null);

  // Collect all refs into an array for the birds
  const sitRefs = [
    cloud1Ref, cloud2Ref,
    bush1Ref, bush2Ref, bush3Ref, bush4Ref, bush5Ref, bush6Ref, bush7Ref,
    flower1Ref, flower2Ref, flower3Ref, flower4Ref
  ];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className="bg-[url('/landingbgimage.png')] bg-fixed bg-cover bg-center relative overflow-hidden"
    >
      {/* Ghibli Birds Animation */}
      <BirdsAnimation sitRefs={sitRefs as React.RefObject<HTMLElement>[]} numBirds={3} />
      {/* Decorative Clouds - Top Corners */}
      <CloudElement
        ref={cloud1Ref}
        variant={1}
        className="fixed top-4 left-10 z-20 animate-float"
        style={{ width: 120, height: 80, opacity: 0.85 }}
      />
      <CloudElement
        ref={cloud2Ref}
        variant={2}
        className="fixed top-6 right-30 z-20 animate-float"
        style={{ width: 100, height: 70, opacity: 0.75, animationDelay: "2s" }}
      />
      {/* Decorative Grass - Bottom */}
      {/* Responsive Grass Bushes (visible on all screens, widths adapt) */}
      <GrassBushElement
        ref={bush1Ref}
        variant={3}
        className="fixed bottom-0 -left-10 z-20 block"
        style={{ width: "32vw", maxWidth: 220, minWidth: 90, height: 56 }}
      />
      <GrassBushElement
        ref={bush2Ref}
        variant={5}
        className="fixed bottom-0 -right-10 z-20 block"
        style={{ width: "28vw", maxWidth: 200, minWidth: 80, height: 50 }}
      />{" "}
      <GrassBushElement
        ref={bush3Ref}
        variant={7}
        className="fixed bottom-0 -right-32 z-20 block"
        style={{ width: "28vw", maxWidth: 200, minWidth: 80, height: 50 }}
      />
      <GrassBushElement
        ref={bush4Ref}
        variant={2}
        className="fixed bottom-2  left-52 z-20 hidden sm:block"
        style={{ width: "22vw", maxWidth: 180, minWidth: 70, height: 44 }}
      />
      <GrassBushElement
        ref={bush5Ref}
        variant={6}
        className="fixed bottom-2 animate-float  left-64 z-20 hidden sm:block"
        style={{ width: "23vw", maxWidth: 180, minWidth: 70, height: 44 }}
      />
      <GrassBushElement
        ref={bush6Ref}
        variant={7}
        className="fixed bottom-2   left-84 z-20 hidden sm:block"
        style={{ width: "22vw", maxWidth: 180, minWidth: 70, height: 44 }}
      />
      {/* Responsive Flowers (visible on all screens) */}
      <FlowerCropElement
        ref={flower1Ref}
        variant={3}
        className="fixed bottom-6 left-64 z-30 animate-float block"
        style={{ width: 64, height: 64, animationDelay: "1s" }}
      />{" "}
      <FlowerCropElement
        ref={flower2Ref}
        variant={1}
        className="fixed bottom-2 -left-32 z-30 animate-float block"
        style={{ width: 36, height: 36, animationDelay: "1s" }}
      />{" "}
      <FlowerCropElement
        ref={flower3Ref}
        variant={2}
        className="fixed bottom-2 right-4 z-30 animate-float block"
        style={{ width: 36, height: 36, animationDelay: "2.5s" }}
      />{" "}
      <FlowerCropElement
        ref={flower4Ref}
        variant={1}
        className="fixed bottom-8 right-4 z-30 animate-float block"
        style={{ width: 64, height: 64, animationDelay: "2.5s" }}
      />
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-3">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
