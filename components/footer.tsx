"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "#contact" },
];

interface FooterProps {
  transparent?: boolean;
}

export default function Footer({ transparent = false }: FooterProps) {
  return (
    <footer
      className={`w-full relative z-40 mt-auto px-0 pt-0 pb-0 flex flex-col items-center bg-none `}
      style={{ minHeight: '180px' }}
    >
      {/* Background overlay for Ghibli blur and color */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/landingbgimage.png"
          alt="Ghibli Footer Background"
          fill
          className="object-cover object-bottom opacity-70 blur-[2px] scale-110"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d4a3e]/90 via-[#3e5a4a]/70 to-transparent" />
        {/* Decorative SVG vines/leaves */}
        <svg className="absolute left-4 bottom-4 w-24 h-10 opacity-50" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22c16-16 80-16 96 0" stroke="#b7c77d" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-4 top-4 w-16 h-8 opacity-40" viewBox="0 0 70 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 14c8-10 56-10 66 0" stroke="#8fc7b7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-8 px-6 gap-6">
        <div className="flex items-center gap-2 text-2xl drop-shadow-md">
          <Image
            src="/spinelessapilogo.png"
            alt="Spineless API Logo"
            width={38}
            height={38}
            className="mr-2 animate-float"
          />
          <span className="font-ghibli font-bold text-[#f5ebd7] tracking-wide">Spineless API</span>
        </div>
        <div className="flex flex-wrap gap-6 my-4 md:my-0">
          {FOOTER_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-2 py-1 group transition-colors duration-300 hover:text-[#b7c77d] font-ghibli text-lg"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b7c77d] transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 text-xs text-[#f5ebd7]/90 md:items-end">
          <span className="font-ghibli">&copy; 2025 Spineless API. All rights reserved.</span>
          <div className="flex gap-3 mt-1">
            <a href="https://github.com/s_r_x_9" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition-transform">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#b7c77d]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.12-1.48-1.12-1.48-.92-.65.07-.64.07-.64 1.02.07 1.56 1.07 1.56 1.07 .9 1.59 2.36 1.13 2.94.87.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.29 9.29 0 012.5-.34c.85 0 1.7.11 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05 .55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a href="https://x.com/s_r_x_9" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="hover:scale-110 transition-transform">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-[#b7c77d]">
                <path d="M18.29 5.71a1 1 0 0 0-1.42 0l-4.29 4.3-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 1 0 1.42 1.42l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42-1.42l-4.3-4.29 4.3-4.29a1 1 0 0 0 0-1.42z" fill="#b7c77d"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
