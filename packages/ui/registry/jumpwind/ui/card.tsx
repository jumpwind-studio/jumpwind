import { cn } from "@/registry/jumpwind/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";

function Card(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        local.class,
      )}
      data-slot="card"
      {...rest}
    />
  );
}

function CardHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        local.class,
      )}
      data-slot="card-header"
      {...rest}
    />
  );
}

function CardTitle(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("font-semibold leading-none", local.class)}
      data-slot="card-title"
      {...rest}
    />
  );
}

function CardDescription(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("text-muted-foreground text-sm", local.class)}
      data-slot="card-description"
      {...rest}
    />
  );
}
function CardAction(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        local.class,
      )}
      data-slot="card-action"
      {...rest}
    />
  );
}

function CardContent(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class={cn("px-6", local.class)} data-slot="card-content" {...rest} />
  );
}

function CardFooter(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex items-center px-6 [.border-t]:pt-6", local.class)}
      data-slot="card-footer"
      {...rest}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
