"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
    requiresAuth?: boolean
  }[]
}) {
  const { user } = useAuth()
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  
  // Filter items based on authentication status
  const filteredItems = items.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  )

  // If no user is logged in and all items require auth, don't show the section
  if (filteredItems.length === 0) {
    return null
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-[#2D5362]/80">Resources</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton 
              asChild
              isActive={pathname === item.url}
            >
              <Link href={item.url}>
                <item.icon className="mr-2 text-[#5C9EAD]" />
                <span className="text-[#2D5362]">{item.name}</span>
              </Link>
            </SidebarMenuButton>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem asChild>
                    <Link href={item.url}>
                      <IconFolder className="mr-2 text-[#5C9EAD]" />
                      <span>Open</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 className="mr-2 text-[#5C9EAD]" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash className="mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        ))}
        {user && (
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="text-sidebar-foreground/70"
            >
              <Link href="/dashboard/resources">
                <IconDots className="mr-2 text-[#5C9EAD]/70" />
                <span className="text-[#2D5362]/70">More Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
