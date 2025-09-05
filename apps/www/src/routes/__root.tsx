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
    meta: [
      { title: "Jumpwind Studios" },
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...seo({
        title: "Jumpwind Studios",
        description: "Web development agency from workers to workers.",
      }),
    ],
    links: [
      { href: "/favicon.ico", rel: "icon" },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [{ children: THEME_HEADER_SCRIPT }],
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
