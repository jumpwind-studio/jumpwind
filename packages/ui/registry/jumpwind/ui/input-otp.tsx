import { cn } from "@/registry/jumpwind/lib/utils";
import * as OtpPrimitive from "corvu/otp-field";
import { type ComponentProps, Show, splitProps } from "solid-js";

const useOtp = OtpPrimitive.useContext;

function Otp(props: ComponentProps<typeof OtpPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class", "containerClass"]);

  return (
    <OtpPrimitive.Root
      class={cn("disabled:cursor-not-allowed", local.class)}
      containerClass={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        local.containerClass,
      )}
      data-slot="otp"
      {...rest}
    />
  );
}

function OtpHiddenInput(props: ComponentProps<typeof OtpPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <OtpPrimitive.Input
      class={cn(local.class)}
      data-slot="otp-hidden-input"
      {...rest}
    />
  );
}

function OtpGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex items-center", local.class)}
      data-slot="otp-group"
      {...rest}
    />
  );
}

function OtpSlot(
  props: ComponentProps<"div"> & {
    index: number;
  },
) {
  const [local, rest] = splitProps(props, ["class", "index"]);

  const context = OtpPrimitive.useContext();

  const char = () => {
    return context.value()[local.index];
  };
  const isActive = () => {
    return context.activeSlots().includes(local.index);
  };
  const showFakeCaret = () => {
    return context.isInserting() && context.value().length === props.index;
  };

  return (
    <div
      class={cn(
        "relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs outline-ring/50 ring-ring/10 transition-all first:rounded-l-md first:border-l last:rounded-r-md data-active:z-10 data-active:outline-1 data-active:ring-4 dark:outline-ring/40 dark:ring-ring/20",
        local.class,
      )}
      bool:data-active={isActive()}
      data-slot="otp-slot"
      {...rest}
    >
      {char()}
      <Show when={showFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      </Show>
    </div>
  );
}

function OtpSeparator(props: ComponentProps<"hr">) {
  return <hr data-slot="otp-separator" {...props} />;
}

export { Otp, OtpGroup, OtpHiddenInput, OtpSlot, OtpSeparator, useOtp };
