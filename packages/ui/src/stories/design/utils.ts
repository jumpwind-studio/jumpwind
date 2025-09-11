/**
 * Function type for customizing token names.
 * @param value - The raw token value
 * @param prefix - The prefix being applied
 * @returns The custom name for the token
 */
type NameTransformer<TValue extends string | number, TPrefix extends string> = (
  value: TValue,
  prefix: TPrefix,
) => string;

/**
 * Function type for customizing token values.
 * @param value - The raw token value
 * @param prefix - The prefix being applied
 * @returns The custom value for the token
 */
type ValueTransformer<
  TValue extends string | number,
  TPrefix extends string,
> = (value: TValue, prefix: TPrefix) => TValue | string;

/**
 * Configuration options for token generation.
 * @template TValue - The type of the raw token values
 * @template TPrefix - The prefix string type
 */
interface TokenGenerationOptions<
  TValue extends string | number,
  TPrefix extends string = "",
> {
  /** Custom name resolver - can be a static string or transform function */
  name?: string | NameTransformer<TValue, TPrefix>;
  /** Custom value resolver - can be a static value or transform function */
  value?: TValue | ValueTransformer<TValue, TPrefix>;
}

/**
 * A design token with a name and value.
 * @template TValue - The type of the raw token value
 * @template TPrefix - The prefix string type
 */
export type Token<TValue extends string | number, TPrefix extends string> = {
  /** The token name - prefixed if prefix is provided, raw if not */
  name: TPrefix extends "" ? string : `${TPrefix}-${string}`;
  /** The token value - CSS custom property if prefixed, raw value if not */
  value: TPrefix extends "" ? TValue : `--${TPrefix}-${string}`;
};

/**
 * Generates design tokens from raw values with optional prefixing and custom transforms.
 *
 * When no prefix is provided, tokens use raw names and values.
 * When a prefix is provided, names become `prefix-token` and values become CSS custom properties `--prefix-token`.
 *
 * @template TValue - The type of raw token values (string or number)
 * @template TPrefix - The prefix string literal type
 *
 * @param prefix - The prefix to apply to token names and values (empty string for no prefix)
 * @param tokens - Array of raw token values to process
 * @param options - Optional configuration for custom name/value transforms
 * @returns Array of generated tokens with names and values
 *
 * @example
 * ```typescript
 * // Generate CSS custom properties for colors
 * const colors = generateTokens("color", ["red", "blue", "green"]);
 * // Result: [
 * //   { name: "color-red", value: "--color-red" },
 * //   { name: "color-blue", value: "--color-blue" },
 * //   { name: "color-green", value: "--color-green" }
 * // ]
 *
 * // Generate raw tokens without prefix
 * const sizes = generateTokens("", [16, 24, 32]);
 * // Result: [
 * //   { name: "16", value: 16 },
 * //   { name: "24", value: 24 },
 * //   { name: "32", value: 32 }
 * // ]
 *
 * // Custom transforms
 * const spacing = generateTokens("spacing", [1, 2, 3], {
 *   name: (value) => `space-${value}x`,
 *   value: (value) => `${value * 8}px`
 * });
 * // Result: [
 * //   { name: "space-1x", value: "8px" },
 * //   { name: "space-2x", value: "16px" },
 * //   { name: "space-3x", value: "24px" }
 * // ]
 * ```
 */
export function generateTokens<
  TValue extends string | number,
  TPrefix extends string = "",
>(
  prefix: TPrefix,
  tokens: readonly TValue[],
  options?: TokenGenerationOptions<TValue, TPrefix>,
): Token<TValue, TPrefix>[] {
  return tokens.map((token) => ({
    name: token.toString(),
    value: resolveValue(prefix, token, options?.value),
  })) as Token<TValue, TPrefix>[];
}

/**
 * Resolves the final value for a token based on prefix and custom transform.
 */
function resolveValue<TValue extends string | number, TPrefix extends string>(
  prefix: TPrefix,
  token: TValue,
  valueResolver?: TValue | ValueTransformer<TValue, TPrefix>,
): TPrefix extends "" ? TValue : `--${TPrefix}-${string}` {
  if (valueResolver !== undefined) {
    const resolved =
      typeof valueResolver === "function"
        ? valueResolver(token, prefix)
        : valueResolver;
    return resolved as TPrefix extends "" ? TValue : `--${TPrefix}-${string}`;
  }

  if (prefix === "") {
    return token as TPrefix extends "" ? TValue : `--${TPrefix}-${string}`;
  }

  return `--${prefix}-${token}` as TPrefix extends ""
    ? TValue
    : `--${TPrefix}-${string}`;
}
