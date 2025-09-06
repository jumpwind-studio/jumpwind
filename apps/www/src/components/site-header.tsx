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
    <header class="bg-background sticky top-0 z-50 w-full">
      <div class="container mx-auto max-w-4xl">
        <div class="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link to="/" class="flex items-center gap-1.5">
            <image
              href="/icons/skitbit-white.svg"
              alt="Skitbit logo"
              width={20}
              height={20}
              class="h-5 w-5"
            />
            <span class="font-semibold tracking-wide text-white">Skitbit</span>
          </Link>

          {/* Desktop Nav */}
          <nav class="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            <For each={links}>
              {(link) => (
                <Link
                  to={link.href}
                  class="hover:text-purple-300 transition-colors"
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
                "bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5",
                "hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]",
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
                class="liquid-glass border-gray-800 p-0 w-64 flex flex-col"
              >
                {/* Brand Header */}
                <div class="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                  <image
                    href="/icons/skitbit-white.svg"
                    alt="Skitbit logo"
                    width={24}
                    height={24}
                    class="h-6 w-6"
                  />
                  <span class="font-semibold tracking-wide text-white text-lg">
                    Skitbit
                  </span>
                </div>

                {/* Nav Links */}
                <nav class="flex flex-col gap-1 mt-2 text-gray-200">
                  <For each={links}>
                    {(link) => (
                      <Link
                        to={link.href}
                        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-purple-300 transition-colors"
                      >
                        <span class="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                          <Dynamic component={link.icon} class="h-4 w-4" />
                        </span>
                        <span class="text-sm">{link.label}</span>
                      </Link>
                    )}
                  </For>
                </nav>

                {/* CTA Button at Bottom */}
                <div class="mt-auto border-t border-gray-800 p-4">
                  <Link
                    href="https://wa.link/65mf3i"
                    class={cn(
                      "w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5",
                      "hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]",
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
