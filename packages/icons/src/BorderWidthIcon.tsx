import { mergeProps, splitProps } from "solid-js";
import type { IconProps } from "./types.js";

export default function BorderWidthIcon(props: IconProps) {
  const defaultedProps = mergeProps(
    {
      color: "currentColor",
      title: "BorderWidthIcon",
    } as const satisfies IconProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["color", "title"]);

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{local.title}</title>
      <path
        d="M1 3H14V4H1V3ZM1 6H14V8H1V6ZM14 10.25H1V12.75H14V10.25Z"
        fill={local.color}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}
