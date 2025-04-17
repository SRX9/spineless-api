export type SiteConfig = typeof siteConfig;
export const AppHost =
  process.env.NEXT_PUBLIC_HOST || "https://spineless-api.vercel.app";

export const siteConfig = {
  name: "Spineless API",
  twitterHandle: "@s_r_x_9",
  description:
    "Spineless API is a fastest mock APIs generation service designed to accelerate frontend development by providing realistic, consistent test data without waiting for backend teams. Instantly generate persistent, AI-powered mock APIs with contextually appropriate data based on your schemas.",
  ogImage: `${AppHost}/spineless-og-image.png`,
  url: AppHost,
  contact: {
    name: "Contact",
    description: `For any queries, feedback, or support, contact us.`,
    keywords: [
      "Contact Spineless API",
      "Spineless API support",
      "Contact Spineless API team",
      "Get in touch with Spineless API",
    ],
  },
  pricing: {
    name: "Spineless API Pricing",
    description:
      "Explore flexible pricing plans for Spineless API, designed for individual developers and teams needing scalable mock API solutions.",
    keywords: [
      "Spineless API pricing",
      "mock API pricing",
      "Spineless API plans",
      "Spineless API subscription",
      "mock API service cost",
    ],
  },
  terms: {
    name: "Terms of Use",
    description: `Terms user agrees with to use Spineless API.`,
    keywords: [
      "Spineless API terms of use",
      "Spineless API legal terms",
      "user agreement Spineless API",
    ],
  },
  aboutHome: {
    name: "About",
    description: `What is Spineless API? Spineless API is a specialized SaaS platform that helps frontend developers create realistic mock APIs in seconds. By generating contextually appropriate mock data based on defined schemas, Spineless API eliminates the development bottleneck of waiting for backend APIs to be completed before frontend work can begin.`,
    keywords: [
      "What is Spineless API",
      "Spineless API",
      "Spineless API SaaS",
      "Spineless API overview",
      "mock API generation",
      "frontend mock APIs",
    ],
  },
  about: {
    name: "Spineless API Platform",
    description: `Learn more about Spineless API, a platform leveraging AI to generate persistent, schema-based mock APIs for frontend development and automated testing workflows.`,
    keywords: [
      "Spineless API platform",
      "mock API service",
      "AI-powered mock data",
      "Spineless API features",
      "mock API testing",
    ],
  },
  features: {
    name: "Core Features",
    description: `\n- Instant API Generation: Create fully functional mock APIs in seconds.\n- AI-Powered Data Generation: Generate contextually appropriate, realistic mock data.\n- Schema-Based Approach: Define API structure with JSON schemas, including complex objects and relationships.\n- Persistent Endpoints: Unique, persistent URLs for each API.\n- Multiple Schema Support: Manage multiple endpoints and organize by project.\n- Testing Ready: Consistent data for predictable, reliable automated testing.`,
    keywords: [
      "mock API generation",
      "AI mock data",
      "schema-based mock API",
      "persistent mock endpoints",
      "automated testing mock API",
      "Spineless API features",
    ],
  },
  policy: {
    name: "Privacy",
    description:
      "Understand our Privacy Policy and how we manage and protect your data while using Spineless API.",
    keywords: [
      "Spineless API privacy policy",
      "data protection Spineless API",
      "privacy agreement Spineless API",
    ],
  },
  login: {
    name: "Login",
    description:
      "Sign in to Spineless API and start generating mock APIs instantly.",
    keywords: [
      "Spineless API login",
      "Spineless API sign in",
      "sign in Spineless API",
    ],
  },
  workspace: {
    name: "Project Workspace",
    description:
      "Organize and manage your mock APIs by project or feature in the Spineless API workspace.",
    keywords: [
      "mock API workspace",
      "Spineless API workspace",
      "project organization Spineless API",
      "Spineless API dashboard",
      "workspace mock API",
    ],
  },
};
