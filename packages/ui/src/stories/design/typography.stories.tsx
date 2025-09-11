import {
  createEffect,
  For,
  type JSX,
  type ParentProps,
  splitProps,
} from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { cn } from "@/registry/jumpwind/lib/utils";
import { generateTokens } from "@/registry/jumpwind/stories/design/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table.jsx"

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

  const properties = () =>
    generateTokens(tokenProps.prefix, tokenProps.tokens, {
      name: tokenProps.name,
      value: tokenProps.value,
    }).map((token) => ({
      ...token,
      style: styles().getPropertyValue(token.value),
    }));

  createEffect(() => {
    console.log("PROPS", properties());
  });

  return (
    <Table class={cn("min-w-96", local.class)}>
      <TableHeader>
        <TableRow>
          <TableHead>Selector</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Token</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Preview</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={properties()}>
          {(property) => (
            <TableRow>
              <TableCell>{local.style}</TableCell>
              <TableCell>{property.name}</TableCell>
              <TableCell>{property.value}</TableCell>
              <TableCell>
                <For each={property.style.split(",")}>{(v) => <p>{v}</p>}</For>
              </TableCell>
              <TableCell>
                <div
                  class={cn("line-clamp-1", property.value)}
                  style={{
                    [local.style]: property.style,
                  }}
                >
                  {local.children}
                </div>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
};

/**
 * Typography tokens for the design system.
 */
const meta: Meta<TypographyRowProps> = {
  title: "@jumpwind/design/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => <TokenTable {...args} />,
  parameters: {
    layout: "padded",
  },
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
  },
};

/**
 * Font size tokens for the design system.
 */
export const FontSize: Story = {
  args: {
    style: "font-size",
    prefix: "text",
    tokens: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
  },
};

/**
 * Font weight tokens for the design system.
 */
export const FontWeight: Story = {
  args: {
    style: "font-weight",
    prefix: "font-weight",
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
  },
};
