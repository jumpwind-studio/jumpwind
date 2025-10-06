import { Link as BaseLink } from "@jumpwind/ui/link";
import { createLink } from "@tanstack/solid-router";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

const LinkComponent = createLink(BaseLink);

export const Link = (props: ComponentProps<typeof LinkComponent>) => {
  const [local, rest] = splitProps(props, ["children"]);

  return (
    <LinkComponent {...rest}>
      {(state) =>
        typeof local.children === "function"
          ? local.children(state)
          : local.children
      }
    </LinkComponent>
  );
};
