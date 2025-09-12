/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Scripts } from "@tanstack/solid-router";
import type { FlowProps } from "solid-js";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { THEME_HEADER_SCRIPT } from "@/components/theme";
import { seo } from "@/lib/seo";

import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    // biome-ignore-start format: static data
    meta: [
      { title: "Jumpwind Studios" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Jumpwind Studios",
        description: "Web development agency from workers for workers.",
        keywords: [
          "web development", "website design", "custom websites", "cooperative web agency", "digital solutions",
          "web applications", "responsive design", "business websites", "web development services", "worker cooperative",
          "custom web development", "digital strategy", "web design agency", "website development",
        ],
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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
    ],
    scripts: [{ children: THEME_HEADER_SCRIPT }],
    // biome-ignore-end format: end
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument(props: FlowProps) {
  return (
    <>
      <HeadContent />
      <Providers>
        <SiteHeader />
        <div class="font-regular tracking-wide antialiased">
          {props.children}
        </div>
      </Providers>
      <Scripts />
    </>
  );
}
