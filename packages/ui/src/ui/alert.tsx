import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";

const alertVariants = tv({
  base: "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertVariantProps = VariantProps<typeof alertVariants>;

function Alert(props: ComponentProps<"div"> & AlertVariantProps) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <div
      data-slot="alert"
      role="alert"
      class={alertVariants({ variant: local.variant, class: local.class })}
      {...rest}
    />
  );
}

function AlertTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="alert-title"
      class={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        local.class,
      )}
      {...rest}
    />
  );
}

function AlertDescription(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="alert-description"
      class={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
