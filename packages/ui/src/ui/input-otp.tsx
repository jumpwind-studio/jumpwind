import * as OtpPrimitive from "corvu/otp-field";
import { type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";

const useOtp = OtpPrimitive.useContext;

function Otp(props: ComponentProps<typeof OtpPrimitive.Root<"div">>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <OtpPrimitive.Root
      data-slot="otp"
      class={cn("flex items-center gap-2 has-disabled:opacity-50", local.class)}
      {...rest}
    />
  );
}

function OtpHiddenInput(
  props: ComponentProps<typeof OtpPrimitive.Input<"input">>,
) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <OtpPrimitive.Input
      as="input"
      data-slot="otp-hidden-input"
      class={cn(local.class)}
      {...rest}
    />
  );
}

function OtpGroup(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="otp-group"
      class={cn("flex items-center", local.class)}
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

  const otp = useOtp();

  const char = () => otp.value()[local.index];
  const isActive = () => otp.activeSlots().includes(local.index);
  const showFakeCaret = () =>
    otp.isInserting() && otp.value().length === props.index;

  return (
    <div
      data-slot="otp-slot"
      bool:data-active={isActive()}
      class={cn(
        "relative flex h-9 w-9 items-center justify-center border-input border-y border-r text-sm shadow-xs outline-ring/50 ring-ring/10 transition-all",
        "first:rounded-l-md first:border-l last:rounded-r-md",
        "data-active:z-10 data-active:outline-1 data-active:ring-4",
        "dark:outline-ring/40 dark:ring-ring/20",
        "disabled:cursor-not-allowed",
        local.class,
      )}
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

export {
  Otp,
  OtpGroup,
  OtpHiddenInput,
  OtpSlot,
  OtpSeparator,
  // Hooks
  useOtp,
};
