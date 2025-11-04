import { mergeProps, splitProps } from "solid-js";
import type { IconProps } from "./types.js";

export default function AllSidesIcon(props: IconProps) {
  const defaultedProps = mergeProps(
    {
      color: "currentColor",
      title: "AllSidesIcon",
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
        d="M7.5 0.75L9.75 3H5.25L7.5 0.75ZM7.5 14.25L9.75 12H5.25L7.5 14.25ZM3 5.25L0.75 7.5L3 9.75V5.25ZM14.25 7.5L12 5.25V9.75L14.25 7.5Z"
        fill={local.color}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}
