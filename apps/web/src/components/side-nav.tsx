import { Link } from "@tanstack/solid-router";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

export function SiteNav(props: ComponentProps<"nav">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <nav
      class={cn(
        "fixed top-0 left-0 z-50 w-full border-black border-b bg-white",
        local.class,
      )}
      {...rest}
    >
      <div class="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" class="font-bold text-xl tracking-tighter">
          JUMPWIND
        </Link>
        <div class="flex space-x-8">
          <Link
            to="#work"
            class="text-sm uppercase tracking-widest transition-colors hover:text-red-600"
          >
            Work
          </Link>
          <Link
            to="#about"
            class="text-sm uppercase tracking-widest transition-colors hover:text-red-600"
          >
            About
          </Link>
          <Link
            to="#contact"
            class="text-sm uppercase tracking-widest transition-colors hover:text-red-600"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
