import { Button } from "@jumpwind/ui/button";
import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, onCleanup, onMount } from "solid-js";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main class="isolate flex h-screen flex-col items-center justify-center">
      <Hero />
    </main>
  );
}

const COLORS = ["blue", "red", "orange", "green"] as const;
type Color = (typeof COLORS)[number];

function Hero() {
  const [currentIndex, setCurrentIndex] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % COLORS.length);
    }, 5000);

    onCleanup(() => clearInterval(interval));
  });

  const getNextIndex = () => (currentIndex() + 1) % COLORS.length;

  return (
    <section class="container mx-auto px-4 pt-32 pb-20 md:px-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 mb-8 md:col-span-7 md:mb-0">
          <h1 class="mb-6 font-bold text-8xl uppercase leading-none tracking-tighter md:text-9xl">
            Jumpwind
            <br />
            Studios
          </h1>
          <p class="max-w-xl text-3xl">
            Worker-owned cooperative agency. For workers, by workers.
          </p>
        </div>
        <div class="col-span-12 flex items-center justify-center md:col-span-5">
          <div
            class={cn(
              "relative aspect-square w-full",
              "transition-colors duration-1000 ease-linear",
              `bg-${COLORS[currentIndex()]}-600`,
            )}
          >
            <div class="-bottom-4 -right-4 absolute h-24 w-24 bg-background" />
          </div>
        </div>
        <Button variant="outline" size="lg">
          Random button!
        </Button>
      </div>
    </section>
  );
}
