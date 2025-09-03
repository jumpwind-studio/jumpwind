import * as AccordionPrimitive from "corvu/accordion";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

const useAccordion = AccordionPrimitive.useContext;
const useAccordionItem = AccordionPrimitive.useItemContext;
const useAccordionDisclosure = AccordionPrimitive.useDisclosureContext;

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
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
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-open]>svg]:rotate-180",
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
      class="overflow-hidden text-sm data-closed:animate-accordion-up data-open:animate-accordion-down"
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
  // Context
  useAccordion,
  useAccordionItem,
  useAccordionDisclosure,
};
