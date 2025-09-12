import { Button } from "@jumpwind/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@jumpwind/ui/sheet";
import MenuIcon from "lucide-solid/icons/menu";
import { createSignal, For } from "solid-js";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const links = [
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
    { href: "#about", label: "About" },
  ];

  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <header
      bool:data-closed={isOpen()}
      bool:data-open={!isOpen()}
      class={cn(
        "sticky top-0 z-50 w-full border-border border-b bg-background",
      )}
    >
      <div class="container mx-auto flex h-(--header-height) items-center justify-between px-4 py-4 md:px-8">
        {/* Desktop Nav */}
        <Link to="/" class="font-bold text-2xl tracking-tighter">
          <span class="in-data-closed:slide-out-to-left-3 in-data-closed:hidden in-data-closed:animate-out transition-all duration-1000">
            JUMPWIND
          </span>
          <span class="in-data-open:hidden text-muted">JW</span>
        </Link>

        <div class="hidden space-x-8 md:flex">
          <For each={links}>
            {(link) => (
              <Link
                to={link.href}
                class="text-sm uppercase tracking-widest transition-colors hover:text-red-600"
              >
                {link.label}
              </Link>
            )}
          </For>
        </div>

        {/* Mobile Nav */}
        <div class="md:hidden">
          <Sheet side="right" open={isOpen()} onOpenChange={setIsOpen}>
            <SheetTrigger
              as={Button}
              variant="outline"
              size="icon"
              // class="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
            >
              <span class="sr-only">Open menu</span>
              <MenuIcon class="size-5" />
            </SheetTrigger>
            <SheetContent
              Icon={<MenuIcon class="size-4" />}
              // class="flex w-64 flex-col border-muted p-0"
            >
              {/* Nav Links */}
              <nav class="mt-8 flex flex-col gap-4 pl-4">
                <For each={links}>
                  {(link) => (
                    <Link
                      to={link.href}
                      class="text-sm uppercase tracking-widest transition-colors hover:text-red-600 active:text-red-600"
                    >
                      {link.label}
                    </Link>
                  )}
                </For>
              </nav>
              <SheetHeader class="absolute bottom-2 left-0 flex h-[calc(var(--header-height)/1.2)] justify-center">
                <Link to="/" class="font-bold text-2xl tracking-tighter">
                  JUMPWIND
                </Link>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
