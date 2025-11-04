import { mergeProps, splitProps } from "solid-js";
import type { IconProps } from "./types.ts";

export default function DragHandleDots1Icon(props: IconProps) {
  const defaultedProps = mergeProps(
    {
      color: "currentColor",
      title: "DragHandleDots1Icon",
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
      <title>{local.title}</title>
      <circle cx="4.5" cy="2.5" r=".6" fill={color()} />
      <circle cx="4.5" cy="4.5" r=".6" fill={color()} />
      <circle cx="4.5" cy="6.499" r=".6" fill={color()} />
      <circle cx="4.5" cy="8.499" r=".6" fill={color()} />
      <circle cx="4.5" cy="10.498" r=".6" fill={color()} />
      <circle cx="4.5" cy="12.498" r=".6" fill={color()} />
      <circle cx="6.5" cy="2.5" r=".6" fill={color()} />
      <circle cx="6.5" cy="4.5" r=".6" fill={color()} />
      <circle cx="6.5" cy="6.499" r=".6" fill={color()} />
      <circle cx="6.5" cy="8.499" r=".6" fill={color()} />
      <circle cx="6.5" cy="10.498" r=".6" fill={color()} />
      <circle cx="6.5" cy="12.498" r=".6" fill={color()} />
      <circle cx="8.499" cy="2.5" r=".6" fill={color()} />
      <circle cx="8.499" cy="4.5" r=".6" fill={color()} />
      <circle cx="8.499" cy="6.499" r=".6" fill={color()} />
      <circle cx="8.499" cy="8.499" r=".6" fill={color()} />
      <circle cx="8.499" cy="10.498" r=".6" fill={color()} />
      <circle cx="8.499" cy="12.498" r=".6" fill={color()} />
      <circle cx="10.499" cy="2.5" r=".6" fill={color()} />
      <circle cx="10.499" cy="4.5" r=".6" fill={color()} />
      <circle cx="10.499" cy="6.499" r=".6" fill={color()} />
      <circle cx="10.499" cy="8.499" r=".6" fill={color()} />
      <circle cx="10.499" cy="10.498" r=".6" fill={color()} />
      <circle cx="10.499" cy="12.498" r=".6" fill={color()} />
    </svg>
  );
}
