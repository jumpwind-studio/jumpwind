import * as CollapsiblePrimitive from "corvu/disclosure";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";

const useCollapsible = CollapsiblePrimitive.useContext;

function Collapsible(
  props: ComponentProps<typeof CollapsiblePrimitive.Root> & {
    class?: string;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={local.class}>
      <CollapsiblePrimitive.Root data-slot="collapsible" {...rest}>
        {local.children}
      </CollapsiblePrimitive.Root>
    </div>
  );
}

function CollapsibleTrigger(
  props: ComponentProps<typeof CollapsiblePrimitive.Trigger>,
) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent(
  props: ComponentProps<typeof CollapsiblePrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      class={cn(
        "data-collapsed:animate-collapse data-expanded:animate-expand",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  // Hooks
  useCollapsible,
};
