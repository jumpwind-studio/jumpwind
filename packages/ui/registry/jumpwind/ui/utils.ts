import { type ClassValue, cnBase } from "tailwind-variants";

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to combine.
 * @returns The combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return cnBase(inputs);
}
