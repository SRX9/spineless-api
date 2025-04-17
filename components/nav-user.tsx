"use client"

import { useRouter } from "next/navigation"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconLogin,
  IconNotification,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react"

import { useAuth } from "@/hooks/use-auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { user, signOut } = useAuth()
  const { isMobile } = useSidebar()
  const router = useRouter()

  // If user is not logged in, show login/signup buttons
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="bg-[#5C9EAD]/10 hover:bg-[#5C9EAD]/20"
            onClick={() => router.push("/auth/signin")}
          >
            <Button variant="ghost" className="w-full justify-start">
              <IconLogin className="mr-2 size-4 text-[#5C9EAD]" />
              <span className="text-[#2D5362]">Sign In</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="bg-[#5C9EAD]/10 hover:bg-[#5C9EAD]/20"
            onClick={() => router.push("/auth/signup")}
          >
            <Button variant="ghost" className="w-full justify-start">
              <IconUserPlus className="mr-2 size-4 text-[#5C9EAD]" />
              <span className="text-[#2D5362]">Sign Up</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user.email) return "SP"
    const parts = user.email.split("@")[0].split(/[._-]/)
    return parts.length > 1 
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase()
  }

  // For logged in users
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg ">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                <AvatarFallback className="rounded-lg bg-[#5C9EAD]/20 text-[#2D5362]">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                  <AvatarFallback className="rounded-lg bg-[#5C9EAD]/20 text-[#2D5362]">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.user_metadata?.name || user.email?.split("@")[0]}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                <IconUserCircle className="mr-2 size-4 text-[#5C9EAD]" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/billing")}>
                <IconCreditCard className="mr-2 size-4 text-[#5C9EAD]" />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <IconLogout className="mr-2 size-4 text-[#5C9EAD]" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
