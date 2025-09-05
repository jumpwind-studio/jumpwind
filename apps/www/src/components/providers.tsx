import { Toaster } from "@jumpwind/ui/sonner";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { type ComponentProps, type FlowComponent, splitProps } from "solid-js";
import { ThemeProvider } from "@/components/theme/theme-provider";

export interface ProviderProps {
  theme?: Omit<ComponentProps<typeof ThemeProvider>, "children">;
  routerDevtools?: Omit<
    ComponentProps<typeof TanStackRouterDevtools>,
    "children"
  >;
}

export const Providers: FlowComponent<ProviderProps> = (props) => {
  const [local, providers] = splitProps(
    props,
    ["children"],
    ["routerDevtools", "theme"],
  );

  return (
    <ThemeProvider defaultTheme="system" {...providers.theme}>
      {local.children}
      <TanStackRouterDevtools
        position="bottom-right"
        initialIsOpen={false}
        {...providers.routerDevtools}
      />
      <Toaster />
    </ThemeProvider>
  );
};
