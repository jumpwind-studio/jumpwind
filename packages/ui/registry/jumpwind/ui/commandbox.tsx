import createControllableSignal from "@corvu/utils/create/controllableSignal";
import ChevronsUpDownIcon from "lucide-solid/icons/chevrons-up-down";
import {
  type ComponentProps,
  For,
  mergeProps,
  Show,
  splitProps,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Button } from "@/registry/jumpwind/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/jumpwind/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/jumpwind/ui/popover";

type Option = {
  value: string;
  label: string;
};

type CommandboxProps = Pick<
  ComponentProps<typeof Popover>,
  "open" | "onOpenChange" | "initialOpen" | "placement"
> &
  Pick<
    ComponentProps<typeof Command>,
    "value" | "onValueChange" | "onSelect" | "defaultValue"
  > & {
    class?: string;
    items: Array<string | Option>;
    placeholder?: string;
    empty?: string;
  };

function Commandbox(props: CommandboxProps) {
  const defaultedProps = mergeProps(
    {
      placeholder: "Search...",
      empty: "No results found.",
    },
    props,
  );

  const [local, popoverProps, commandProps] = splitProps(
    defaultedProps,
    ["class", "placeholder", "items", "empty"],
    ["open", "onOpenChange", "initialOpen", "placement"],
    ["value", "onValueChange", "defaultValue", "onSelect"],
  );

  const items = () =>
    local.items.map((item) =>
      typeof item === "string" ? { label: item, value: item } : item,
    );

  const [open, setOpen] = createControllableSignal({
    initialValue: popoverProps.initialOpen ?? false,
    value: () => popoverProps.open,
    onChange: (open) => popoverProps.onOpenChange?.(open),
  });

  const [value, setValue] = createControllableSignal({
    initialValue: commandProps.defaultValue ?? "",
    value: () => commandProps.value,
    onChange: (value) => commandProps.onValueChange?.(value),
  });

  return (
    <Popover {...popoverProps} open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        as={Button}
        variant="outline"
        role="combobox"
        aria-expanded={popoverProps.open}
        class={cn("w-[200px] justify-between", local.class)}
      >
        <Show when={value()} fallback={local.placeholder}>
          {(value) => items().find((item) => item.value === value())?.label}
        </Show>
        <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command {...commandProps} value={value()} onValueChange={setValue}>
          <CommandInput placeholder={local.placeholder} />
          <CommandList>
            <CommandEmpty>{local.empty}</CommandEmpty>
            <CommandGroup>
              <For each={items()}>
                {(item) => (
                  <CommandItem
                    value={item.value}
                    onSelect={(value) => {
                      setValue((prev) => (prev !== value ? value : ""));
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                )}
              </For>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Commandbox };
