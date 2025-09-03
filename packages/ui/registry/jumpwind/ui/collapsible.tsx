import * as DisclosurePrimitive from "corvu/disclosure";
import { type ComponentProps, splitProps } from "solid-js";

const useCollapsible = DisclosurePrimitive.useContext;

function Collapsible(
  props: ComponentProps<typeof DisclosurePrimitive.Root> &
    ComponentProps<"div">,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DisclosurePrimitive.Root data-slot="collapsible" {...rest}>
      <div class={local.class}>{local.children}</div>
    </DisclosurePrimitive.Root>
  );
}

function CollapsibleTrigger(
  props: ComponentProps<typeof DisclosurePrimitive.Trigger>,
) {
  return (
    <DisclosurePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

function CollapsibleContent(
  props: ComponentProps<typeof DisclosurePrimitive.Content>,
) {
  return (
    <DisclosurePrimitive.Content data-slot="collapsible-content" {...props} />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, useCollapsible };
