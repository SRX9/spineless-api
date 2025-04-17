import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const ghibliRegular = localFont({
  src: "../assets/Eyad Al-Samman - Ghibli.otf",
  variable: "--font-ghibli",
  display: "swap",
});

const ghibliBold = localFont({
  src: "../assets/Eyad Al-Samman - Ghibli-Bold.otf",
  variable: "--font-ghibli-bold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spinliness API - Spineless API",
  description: "A powerful mock API generation service for frontend development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Spineless API" />
      </head>
      <body
        className={`${ghibliRegular.variable} ${ghibliBold.variable} font-ghibli antialiased relative`}
      >
        <NextTopLoader
          color="var(--color-primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={10}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--color-primary),0 0 5px var(--color-primary)"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <div className="texture" />
        {children}
      </body>
    </html>
  );
}
