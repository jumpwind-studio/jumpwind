import { mergeProps, splitProps } from "solid-js";
import type { IconProps } from "./types.js";

export default function DotFilledIcon(props: IconProps) {
  const defaultedProps = mergeProps(
    {
      color: "currentColor",
      title: "DotFilledIcon",
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
        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
        fill={local.color}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}
