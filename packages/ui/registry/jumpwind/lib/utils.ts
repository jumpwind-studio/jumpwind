import { type ClassValue, cnBase } from "tailwind-variants";

/**
 * Combines multiple class strings into one single string.
 *
 * @param classes - The classes to combine.
 * @returns The combined classes.
 */
export function cn(...classes: ClassValue[]) {
  return cnBase(classes);
}
