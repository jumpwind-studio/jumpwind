import {
  createEffect,
  For,
  type JSX,
  type ParentProps,
  splitProps,
} from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { generateTokens } from "@/registry/jumpwind/stories/design/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/jumpwind/ui/table";

type Typography = {
  name: string;
  value: string;
};

type GenerateTokenParams = Required<Parameters<typeof generateTokens>>;

type TypographyRowProps = ParentProps<{
  style: keyof JSX.CSSProperties;
  prefix: GenerateTokenParams[0];
  tokens: GenerateTokenParams[1];
  name?: GenerateTokenParams[2]["name"];
  value?: GenerateTokenParams[2]["value"];
  class?: string;
}>;

const TokenTable = (props: TypographyRowProps) => {
  const [local, tokenProps] = splitProps(
    props,
    ["class", "children", "style"],
    ["prefix", "tokens", "name", "value"],
  );

  const styles = () => window.getComputedStyle(document.body);

  const style = () => styles().getPropertyValue(local.style);

  const properties = () =>
    generateTokens(tokenProps.prefix, tokenProps.tokens, {
      name: tokenProps.name,
      value: tokenProps.value,
    }).map((token) => ({
      ...token,
      style: styles().getPropertyValue(token.value),
    }));

  createEffect(() => {
    // console.log(styles());
    console.log("STYLE", `${local.style} => ${style()}`);
    console.log("PROPS", properties());
  });

  return (
    <Table class={local.class}>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Preview</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={properties()}>
          {(property) => {
            return (
              <TableRow>
                <TableCell>
                  <For each={local.style.split(",")}>{(v) => <p>{v}</p>}</For>
                </TableCell>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.value}</TableCell>
                <TableCell>
                  <div
                    class="line-clamp-1"
                    style={{
                      [local.style]: property.style,
                    }}
                  >
                    {local.children}
                  </div>
                </TableCell>
              </TableRow>
            );
          }}
        </For>
      </TableBody>
    </Table>
  );
};

/**
 * Typography tokens for the design system.
 */
const meta = {
  title: "@jumpwind/design/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => <TokenTable {...args} />,
} satisfies Meta<TypographyRowProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Font family tokens for the design system.
 */
export const FontFamily: Story = {
  args: {
    style: "font-family",
    prefix: "font",
    tokens: ["sans", "serif", "mono"],
    // value: (value, prefix) => `--${prefix}-${value}`,
  },
};

/**
 * Font size tokens for the design system.
 */
export const FontSize: Story = {
  args: {
    style: "font-size",
    prefix: "text",
    tokens: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    // value: (value, prefix) => `--${prefix}-${value}`,
  },
};

/**
 * Font weight tokens for the design system.
 */
export const FontWeight: Story = {
  args: {
    style: "font-weight",
    prefix: "font",
    tokens: [
      "thin",
      "extralight",
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ],
    value: (value, prefix) => `--${prefix}-${value}`,
  },
};

/**
 * Letter Spacing tokens for the design system.
 */
export const LetterSpacing: Story = {
  args: {
    style: "letter-spacing",
    prefix: "tracking",
    tokens: ["tighter", "tight", "normal", "wide", "wider", "widest"],
    value: (value, prefix) => `--${prefix}-${value}`,
  },
};
