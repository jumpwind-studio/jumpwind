import {
  type FlowProps,
  For,
  type JSX,
  type ParentProps,
  splitProps,
} from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { cn } from "@/registry/jumpwind/lib/utils";
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
  class?: string;
};

const TypographyRow = (
  props: ParentProps<
    Typography & {
      styleKey: keyof JSX.CSSProperties;
    }
  >,
) => {
  const [local] = splitProps(props, ["class", "children", "name", "styleKey"]);
  const style = () => window.getComputedStyle(document.body);
  const styleValue = () => {
    console.log("STYLE", style());
    const out = style().getPropertyValue(props.value);
    console.log(`propertyValue(${props.value}) => ${out}`);
    return out;
  };

  return (
    <TableRow>
      <TableCell>{local.name}</TableCell>
      <TableCell>
        <For each={styleValue().split(",")}>{(v) => <p>{v}</p>}</For>
      </TableCell>
      <TableCell>
        <div
          style={{ [local.styleKey]: `${styleValue()}` }}
          class={cn("line-clamp-1", local.class)}
        >
          {local.children}
        </div>
      </TableCell>
    </TableRow>
  );
};

/**
 * Typography tokens for the design system.
 */
const meta: Meta<
  FlowProps<{
    key: keyof JSX.CSSProperties;
    property: Typography[];
  }>
> = {
  title: "@jumpwind/design/Typography",
  argTypes: {},
  args: {
    children: "Typeface",
  },
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>
            <span class="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={args.property}>
          {(property) => (
            <TypographyRow
              styleKey={args.key}
              name={property.name}
              value={property.value}
            >
              {args.children}
            </TypographyRow>
          )}
        </For>
      </TableBody>
    </Table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Font family tokens for the design system.
 */
export const FontFamily: Story = {
  args: {
    key: "font-family",
    property: generateTokens("font", ["sans", "serif", "mono"]),
  },
};

/**
 * Font size tokens for the design system.
 */
export const FontSize: Story = {
  args: {
    key: "font-size",
    property: generateTokens("text", [
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
    ]),
  },
};

/**
 * Font weight tokens for the design system.
 */
export const FontWeight: Story = {
  args: {
    key: "font-weight",
    property: generateTokens("font-weight", [
      "thin",
      "extralight",
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ]),
  },
};

/**
 * Letter Spacing tokens for the design system.
 */
export const LetterSpacing: Story = {
  args: {
    key: "letter-spacing",
    property: generateTokens("tracking", [
      "tighter",
      "tight",
      "normal",
      "wide",
      "wider",
      "widest",
    ]),
  },
};

function generateTokens(prefix: string, tokens: string[]) {
  return tokens.map((token) => ({
    name: token,
    value: `--${prefix}-${token}`,
  }));
}
