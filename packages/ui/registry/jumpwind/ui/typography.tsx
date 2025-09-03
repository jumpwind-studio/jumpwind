import { cn } from "@/components/ui/utils";
import {
  type ComponentProps,
  type FlowProps,
  splitProps,
  type ValidComponent,
} from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";

export type TypographyProps<T extends ValidComponent> = FlowProps<
  Omit<DynamicProps<T, ComponentProps<T>>, "component">
> & {
  as?: DynamicProps<T, ComponentProps<T>>["component"];
  class?: string;
};

export const H1 = <T extends ValidComponent = "h1">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
        local.class,
      )}
      component={local.as ?? "h1"}
      data-slot="heading-1"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H2 = <T extends ValidComponent = "h2">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        local.class,
      )}
      component={local.as ?? "h2"}
      data-slot="heading-2"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H3 = <T extends ValidComponent = "h3">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        local.class,
      )}
      component={local.as ?? "h3"}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const H4 = <T extends ValidComponent = "h4">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        local.class,
      )}
      component={local.as ?? "h4"}
      data-slot="heading-4"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Lead = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("text-muted-foreground text-xl", local.class)}
      component={local.as ?? "p"}
      data-slot="lead"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const P = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("not-first:mt-6 leading-7", local.class)}
      component={local.as ?? "p"}
      data-slot="paragraph"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Large = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("font-semibold text-lg", local.class)}
      component={local.as ?? "p"}
      data-slot="large"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Small = <T extends ValidComponent = "p">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("font-medium text-sm leading-none", local.class)}
      component={local.as ?? "p"}
      data-slot="small"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Muted = <T extends ValidComponent = "span">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("text-muted-foreground text-sm", local.class)}
      component={local.as ?? "span"}
      data-slot="muted"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const InlineCode = <T extends ValidComponent = "code">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        local.class,
      )}
      component={local.as ?? "code"}
      data-slot="inline-code"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const List = <T extends ValidComponent = "ul">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn("my-6 ml-6 list-disc [&>li]:mt-2", local.class)}
      component={local.as ?? "ul"}
      data-slot="list"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};

export const Quote = <T extends ValidComponent = "blockquote">(
  props: TypographyProps<T>,
) => {
  const [local, rest] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      class={cn(
        "mt-6 border-l-2 pl-6 text-muted-foreground italic",
        local.class,
      )}
      component={local.as ?? "blockquote"}
      data-slot="quote"
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
};
