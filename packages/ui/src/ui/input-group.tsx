import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/utils.js";
import { Button } from "./button.jsx";
import { Input } from "./input.jsx";
import { Textarea } from "./textarea.jsx";

function InputGroup(props: ComponentProps<"fieldset">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <fieldset
      data-slot="input-group"
      class={cn(
        "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30",
        "h-9 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        local.class,
      )}
      {...rest}
    />
  );
}

const inputGroupAddonVariants = tv({
  base: "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  variants: {
    align: {
      "inline-start":
        "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
      "inline-end":
        "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
      "block-start":
        "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
      "block-end":
        "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
    },
  },
  defaultVariants: {
    align: "inline-start",
  },
});

type InputGroupAddonVariantProps = VariantProps<typeof inputGroupAddonVariants>;

function InputGroupAddon(
  props: ComponentProps<"div"> & InputGroupAddonVariantProps,
) {
  const defaultedProps = mergeProps({ align: "inline-start" as const }, props);

  const [local, rest] = splitProps(defaultedProps, ["class", "align"]);

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={local.align}
      class={cn(
        inputGroupAddonVariants({ align: local.align, class: local.class }),
      )}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...rest}
    />
  );
}

const inputGroupButtonVariants = tv({
  base: "text-sm shadow-none flex gap-2 items-center",
  variants: {
    size: {
      xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
      sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

type InputGroupButtonVariantProps = VariantProps<
  typeof inputGroupButtonVariants
>;

function InputGroupButton(
  props: Omit<ComponentProps<typeof Button>, "size"> &
    InputGroupButtonVariantProps,
) {
  const defaultedProps = mergeProps(
    {
      variant: "ghost" as const,
      size: "xs" as const,
    },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "variant",
    "size",
  ]);

  return (
    <Button
      type="button"
      data-size={local.size}
      variant={local.variant}
      class={cn(
        inputGroupButtonVariants({ size: local.size, class: local.class }),
      )}
      {...rest}
    />
  );
}

function InputGroupText(props: ComponentProps<"span">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn(
        "flex items-center gap-2 text-muted-foreground text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        local.class,
      )}
      {...rest}
    />
  );
}

function InputGroupInput(props: ComponentProps<"input">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Input
      data-slot="input-group-control"
      class={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

function InputGroupTextarea(props: ComponentProps<"textarea">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Textarea
      data-slot="input-group-control"
      class={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
