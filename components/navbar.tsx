"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

function NavLinks({ onClick, isMobile = false }: { onClick?: () => void, isMobile?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative text-lg md:text-base px-3 py-2 rounded-md overflow-hidden group ${isMobile ? '' : 'inline-block'}`}
          onClick={onClick}
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0">{link.label}</span>
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-left transition-transform duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-10 py-3 z-50 transition-all duration-500 ${scrolled ? 'bg-[#f5ebd7] shadow-sm' : 'bg-transparent'}`}>
      <div className="flex items-center gap-3">
        <Link href="/">
          <h1 className={`font-ghibli text-2xl pt-1 md:text-2xl tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#2d4a3e]' : 'text-white'}`}>Spineless API</h1>
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className={`hidden md:flex gap-7 font-medium transition-colors duration-500 ${scrolled ? 'text-[#2d4a3e]' : 'text-white'}`}>
        <NavLinks />
      </div>
      
      {/* Auth Buttons */}
      <div className={`hidden md:flex items-center gap-4 transition-colors duration-500 ${scrolled ? 'text-[#2d4a3e]' : 'text-white'}`}>
        {!loading && (
          user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 hover:bg-white/20 ${scrolled ? 'text-[#2d4a3e] hover:bg-[#2d4a3e]/10' : 'text-white'}`}
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="font-medium">{user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-sm border-none shadow-lg">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className={`hover:bg-white/20 ${scrolled ? 'text-[#2d4a3e] hover:bg-[#2d4a3e]/10' : 'text-white'}`}>
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="">
                  Sign Up
                </Button>
              </Link>
            </>
          )
        )}
      </div>
      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className={`transition-colors duration-500 ${scrolled ? 'text-[#2d4a3e]' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-[#f5ebd7] border-l border-[#2d4a3e]/20 w-[220px]">
          <div className="flex flex-col space-y-7 pt-12 text-lg text-[#2d4a3e]">
            <NavLinks isMobile={true} />
            
            {!loading && (
              user ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-[#2d4a3e]/20">
                  <div className="text-sm text-[#2d4a3e]/70">Signed in as</div>
                  <div className="font-medium">{user.email}</div>
                  <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                  <button 
                    onClick={handleSignOut} 
                    className="text-left text-red-600 hover:text-red-700 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-[#2d4a3e]/20">
                  <Link href="/auth/signin" className="hover:underline">Sign In</Link>
                  <Link href="/auth/signup" className="hover:underline">Sign Up</Link>
                </div>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
