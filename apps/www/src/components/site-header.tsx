import { Button } from "@jumpwind/ui/button";
import { cn } from "@jumpwind/ui/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@jumpwind/ui/sheet";
import BriefcaseIcon from "lucide-solid/icons/briefcase";
import FileTextIcon from "lucide-solid/icons/file-text";
import HelpCircleIcon from "lucide-solid/icons/help-circle";
import InfoIcon from "lucide-solid/icons/info";
import MenuIcon from "lucide-solid/icons/menu";
import TagIcon from "lucide-solid/icons/tag";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Link } from "@/components/ui/link";

export function SiteHeader() {
  const links = [
    { href: "/", label: "Home", icon: BriefcaseIcon },
    { href: "#pricing", label: "Pricing", icon: TagIcon },
    { href: "faq", label: "FAQ", icon: HelpCircleIcon },
    { href: "#blog", label: "Blog", icon: FileTextIcon },
    { href: "About", label: "About", icon: InfoIcon },
  ];

  return (
    <header class="sticky top-0 z-50 w-full bg-background">
      <div class="container mx-auto max-w-4xl">
        <div class="liquid-glass-header flex h-14 items-center justify-between rounded-full px-6">
          {/* Brand Logo */}
          <Link to="/" class="flex items-center gap-1.5">
            <image
              href="/icons/skitbit-white.svg"
              alt="Skitbit logo"
              width={20}
              height={20}
              class="h-5 w-5"
            />
            <span class="font-semibold text-white tracking-wide">Skitbit</span>
          </Link>

          {/* Desktop Nav */}
          <nav class="hidden items-center gap-6 text-gray-300 text-sm md:flex">
            <For each={links}>
              {(link) => (
                <Link
                  to={link.href}
                  class="transition-colors hover:text-purple-300"
                >
                  {link.label}
                </Link>
              )}
            </For>
          </nav>

          {/* Desktop CTA */}
          <div class="hidden md:flex">
            <Link
              to="/contact"
              class={cn(
                "rounded-lg bg-lime-400 px-6 py-2.5 font-medium text-black",
                "hover:scale-[1.02] hover:bg-lime-300 hover:shadow-md",
                "transition-all",
              )}
            >
              Chat With Us
            </Link>
          </div>

          {/* Mobile Nav */}
          <div class="md:hidden">
            <Sheet>
              <SheetTrigger
                as={Button}
                variant="outline"
                size="icon"
                class="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
              >
                <MenuIcon class="h-5 w-5" />
                <span class="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent
                side="right"
                class="liquid-glass flex w-64 flex-col border-gray-800 p-0"
              >
                {/* Brand Header */}
                <div class="flex items-center gap-1.5 border-gray-800 border-b px-4 py-4">
                  <image
                    href="/icons/skitbit-white.svg"
                    alt="Skitbit logo"
                    width={24}
                    height={24}
                    class="h-6 w-6"
                  />
                  <span class="font-semibold text-lg text-white tracking-wide">
                    Skitbit
                  </span>
                </div>

                {/* Nav Links */}
                <nav class="mt-2 flex flex-col gap-1 text-gray-200">
                  <For each={links}>
                    {(link) => (
                      <Link
                        to={link.href}
                        class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-900 hover:text-purple-300"
                      >
                        <span class="inline-flex h-5 w-5 items-center justify-center text-gray-400">
                          <Dynamic component={link.icon} class="h-4 w-4" />
                        </span>
                        <span class="text-sm">{link.label}</span>
                      </Link>
                    )}
                  </For>
                </nav>

                {/* CTA Button at Bottom */}
                <div class="mt-auto border-gray-800 border-t p-4">
                  <Link
                    href="https://wa.link/65mf3i"
                    class={cn(
                      "w-full rounded-lg bg-lime-400 px-6 py-2.5 font-medium text-black",
                      "hover:scale-[1.02] hover:bg-lime-300 hover:shadow-md",
                      "transition-all",
                    )}
                  >
                    Get a Quote
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
