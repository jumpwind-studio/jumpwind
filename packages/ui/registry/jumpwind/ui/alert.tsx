import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export const alertVariants = tv({
  base: "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Alert(
  props: ComponentProps<"div"> & VariantProps<typeof alertVariants>,
) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <div
      class={cn(alertVariants({ variant: local.variant }), local.class)}
      data-slot="alert"
      role="alert"
      {...rest}
    />
  );
}

function AlertTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        local.class,
      )}
      data-slot="alert-title"
      {...rest}
    />
  );
}

function AlertDescription(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        local.class,
      )}
      data-slot="alert-description"
      {...rest}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
