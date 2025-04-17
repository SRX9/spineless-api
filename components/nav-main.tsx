"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    requiresAuth?: boolean
  }[]
}) {
  const { user } = useAuth()
  const pathname = usePathname()

  // Filter items based on authentication status
  const filteredItems = items.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  )

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        <SidebarMenu>
          {filteredItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                <Link
                  href={item.url}
                  className={
                    cn(
                      "flex items-center w-full rounded-lg px-3 py-2 transition-all duration-200 group",
                      pathname === item.url
                        ? "bg-[#e0e6d7]/70 shadow-md border border-[#7ba088]/40 text-[#385c3c] font-ghibli font-semibold"
                        : "hover:bg-[#cbe4de]/50 hover:text-[#385c3c] hover:shadow-sm text-[#2d4a3e] font-ghibli",
                    )
                  }
                >
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
