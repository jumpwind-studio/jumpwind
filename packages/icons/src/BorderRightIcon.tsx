import { mergeProps, splitProps } from "solid-js";
import type { IconProps } from "./types.ts";

export default function BorderRightIcon(props: IconProps) {
  const defaultedProps = mergeProps(
    {
      color: "currentColor",
      title: "BorderRightIcon",
    } as const satisfies IconProps,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, ["color", "title"]);

  const color = () => props.color || "currentColor";
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M13.25 1L13.25 14L14.75 14L14.75 1L13.25 1Z"
        fill={color()}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 5 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 5 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 3 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 3 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 5)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 5)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 3)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 3)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 9)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 9)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 11)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 11)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 9 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 9 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 11 7)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 11 13)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 5 1)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 3 1)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 7 1)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 1 1)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 9 1)"
        fill={color()}
      />
      <rect
        width="1"
        height="1"
        rx=".5"
        transform="matrix(0 1 1 0 11 1)"
        fill={color()}
      />
    </svg>
  );
}
