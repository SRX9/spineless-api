"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconChartBar,
  IconDashboard,
  IconApi,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconLogout,
  IconReport,
  IconSearch,
  IconSettings,
  IconUserCircle,
  IconUsers,
  IconCirclePlusFilled,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconDashboard,
      requiresAuth: false,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      requiresAuth: true,
    },
    {
      title: "API Endpoints",
      url: "/dashboard/apis",
      icon: IconApi,
      requiresAuth: true,
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "/docs",
      icon: IconHelp,
      requiresAuth: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="p-3 flex flex-col gap-8"
    >
      <SidebarHeader className="bg-transparent">
        <SidebarMenu className="rounded-xl bg-transparent!">
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto"
          >
            <Link href="/" className="flex flex-col justify-center items-center gap-3">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                <Image
                  src="/logo-light.png"
                  alt="Spineless API Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <h1
                className={`font-ghibli text-3xl  tracking-tight transition-colors duration-500 text-white`}
              >
                Spineless API
              </h1>
            </Link>
          </SidebarMenuButton>
          {user && (
            <SidebarMenuItem className="flex items-center gap-2 mt-4">
              <SidebarMenuButton
                asChild
                tooltip="Create New API"
                className="bg-primary border border-primary-border shadow-primary text-primary-foreground "
              >
                <Link href="/dashboard/create">
                  <IconCirclePlusFilled className="mr-2" />
                  <span>Create New API</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-background rounded-xl  mt-3">
        <div className=" p-3 rounded-xl mb-auto">
          <NavMain items={data.navMain} />
        </div>
        <div className=" p-3 rounded-xl">
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>

      <SidebarFooter className="mt-4">
        <div className="bg-sidebar p-3 rounded-xl">
          <NavUser />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
