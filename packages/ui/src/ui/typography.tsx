import {
  type ComponentProps,
  type FlowProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import type { DynamicProps } from "solid-js/web";
import { cn } from "../lib/utils.js";

export type TypographyProps<T extends ValidComponent> = FlowProps<
  Omit<DynamicProps<T, ComponentProps<T>>, "component">
> & {
  as?: DynamicProps<T, ComponentProps<T>>["component"];
  class?: string;
};

export const H1 = (props: ComponentProps<"h1">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h1
      data-slot="heading-1"
      class={cn(
        "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </h1>
  );
};

export const H2 = (props: TypographyProps<"h2">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h2
      data-slot="heading-2"
      class={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </h2>
  );
};

export const H3 = (props: ComponentProps<"h3">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h3
      class={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </h3>
  );
};

export const H4 = (props: ComponentProps<"h4">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h4
      data-slot="heading-4"
      class={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </h4>
  );
};

export const Lead = (props: ComponentProps<"p">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      data-slot="lead"
      class={cn("text-muted-foreground text-xl", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};

export const P = (props: ComponentProps<"p">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      data-slot="paragraph"
      class={cn("not-first:mt-6 leading-7", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};

export const Large = (props: ComponentProps<"p">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      data-slot="large"
      class={cn("font-semibold text-lg", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};

export const Small = (props: ComponentProps<"p">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      data-slot="small"
      class={cn("font-medium text-sm leading-none", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};

export const Muted = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      data-slot="muted"
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    >
      {local.children}
    </span>
  );
};

export const InlineCode = (props: ComponentProps<"code">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <code
      data-slot="inline-code"
      class={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </code>
  );
};

export const List = (props: ComponentProps<"ul">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul
      data-slot="list"
      class={cn("my-6 ml-6 list-disc [&>li]:mt-2", local.class)}
      {...rest}
    >
      {local.children}
    </ul>
  );
};

export const Quote = (props: ComponentProps<"blockquote">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <blockquote
      data-slot="quote"
      class={cn(
        "mt-6 border-l-2 pl-6 text-muted-foreground italic",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </blockquote>
  );
};
