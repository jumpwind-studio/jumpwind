import type { RootRouteOptions } from "@tanstack/solid-router";
import type { JSX } from "solid-js";

interface SiteConfig {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export const SITE_CONFIG = {
  title: "Jumpwind Studios",
  description: "Web development agency from workers for workers.",
  keywords: [
    "web development",
    "website design",
    "custom websites",
    "cooperative web agency",
    "digital solutions",
    "web applications",
    "responsive design",
    "business websites",
    "web development services",
    "worker cooperative",
    "custom web development",
    "digital strategy",
    "web design agency",
    "website development",
  ],
} as const satisfies SiteConfig;

type Head = Awaited<ReturnType<NonNullable<RootRouteOptions["head"]>>>;

let cachedHead: Head | undefined;
export const generateHead = (config: SiteConfig): Head => {
  if (cachedHead != null) return cachedHead;
  cachedHead = {
    meta: [
      { title: config.title },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { name: "description", content: config.description },
      {
        name: "keywords",
        content: Array.isArray(config.keywords)
          ? config.keywords.join(", ")
          : config.keywords,
      },
      { name: "twitter:title", content: config.title },
      { name: "twitter:description", content: config.description },
      { name: "twitter:creator", content: "@jumpwind" },
      { name: "twitter:site", content: "@jumpwind" },
      { name: "og:type", content: "website" },
      { name: "og:title", content: config.title },
      { name: "og:description", content: config.description },
      ...(config.image
        ? [
            { name: "twitter:image", content: config.image },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "og:image", content: config.image },
          ]
        : []),
    ] satisfies JSX.MetaHTMLAttributes<HTMLMetaElement>[],
    links: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ] satisfies JSX.LinkHTMLAttributes<HTMLLinkElement>[],
  };
  return cachedHead;
};
