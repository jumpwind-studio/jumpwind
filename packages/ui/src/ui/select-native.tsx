import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { type ComponentProps, splitProps } from "solid-js";
import { cn } from "@/lib/utils";

function NativeSelect(props: ComponentProps<"select">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        class={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          local.class,
        )}
        {...rest}
      />
      <ChevronDownIcon
        class="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 size-4 select-none text-muted-foreground opacity-50"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption(props: ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <optgroup
      data-slot="native-select-optgroup"
      class={cn(local.class)}
      {...rest}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
