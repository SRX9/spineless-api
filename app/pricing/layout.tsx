import { AppHost, siteConfig } from "@/config/site";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: {
    default: siteConfig.pricing.name,
    template: `%s - ${siteConfig.pricing.name}`,
  },
  description: siteConfig.pricing.description,
  keywords: ["Spineless APIs Pricing"],
  openGraph: {
    url: `${AppHost}/pricing`,
    title: siteConfig.pricing.name,
    description: siteConfig.pricing.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    title: siteConfig.pricing.name,
    description: siteConfig.pricing.description,
    card: "summary_large_image",
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
};

export default function Layout({ children }: LayoutProps) {
  return children;
}
