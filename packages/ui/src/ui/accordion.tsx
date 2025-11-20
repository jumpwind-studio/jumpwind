import { ChevronDownIcon } from "@jumpwind/icons";
import * as AccordionPrimitive from "corvu/accordion";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useAccordion = AccordionPrimitive.useContext;
const useAccordionItem = AccordionPrimitive.useItemContext;
const useAccordionDisclosure = AccordionPrimitive.useDisclosureContext;

function Accordion(
  props: Omit<ComponentProps<typeof AccordionPrimitive.Root>, "multiple"> & {
    class?: string;
    type?: "single" | "multiple";
  },
) {
  const [local, rest] = splitProps(props, ["class", "type"]);

  const multiple = (): boolean => {
    if ("multiple" in props && typeof props.multiple === "boolean")
      return props.multiple;
    if (local.type === "multiple") return true;
    return false;
  };

  return (
    <div class={local.class}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        multiple={multiple()}
        {...rest}
      />
    </div>
  );
}

function AccordionItem(props: ComponentProps<typeof AccordionPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      class={cn("border-b last:border-b-0", local.class)}
      {...rest}
    />
  );
}

function AccordionTrigger(
  props: ComponentProps<typeof AccordionPrimitive.Trigger>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      class={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-expanded]>svg]:rotate-180",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronDownIcon class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  );
}

function AccordionContent(
  props: ComponentProps<typeof AccordionPrimitive.Content>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      class="overflow-hidden text-sm data-collapsed:animate-collapse data-expanded:animate-expand"
      {...rest}
    >
      <div class={cn("pt-0 pb-4", local.class)}>{local.children}</div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  // Hooks
  useAccordion,
  useAccordionItem,
  useAccordionDisclosure,
};
