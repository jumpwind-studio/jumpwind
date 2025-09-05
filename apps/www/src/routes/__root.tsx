/// <reference types="vite/client" />

import { Toaster } from "@jumpwind/ui";
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import type { FlowProps } from "solid-js";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      // ...seo({
      //   title:
      //     "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
      //   description:
      //     "TanStack Start is a type-safe, client-first, full-stack React framework. ",
      // }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument(props: FlowProps) {
  return (
    <>
      <HeadContent />
      <div class="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            class: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{" "}
      </div>
      <hr />
      {props.children}
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
      <Scripts />
    </>
  );
}
