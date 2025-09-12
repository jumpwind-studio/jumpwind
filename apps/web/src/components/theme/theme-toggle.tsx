import { Button } from "@jumpwind/ui/button";
import MoonIcon from "lucide-solid/icons/moon";
import SunIcon from "lucide-solid/icons/sun";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";
import { useTheme } from "./use-theme.js";

export function ThemeToggle(props: ComponentProps<typeof Button>) {
  const [local, rest] = splitProps(
    props as ComponentProps<typeof Button<"button">>,
    ["class"],
  );

  const { toggleTheme } = useTheme();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      class={cn(
        "relative flex size-7 items-center justify-center rounded-md text-primary hover:bg-transparent focus:outline-none",
        local.class,
      )}
      {...rest}
    >
      <SunIcon class="dark:-rotate-90 hover:-rotate-6 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <MoonIcon class="hover:-rotate-6 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  );
}
