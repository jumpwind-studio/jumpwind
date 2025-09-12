import { type ClassValue, cn as tvCn } from "tailwind-variants";

/**
 * Combines multiple class strings into one single string.
 *
 * @param classes - The classes to combine.
 * @returns The combined classes.
 */
export function cn(...classes: ClassValue[]): string | undefined {
  return tvCn(classes)({ twMerge: true });
}
