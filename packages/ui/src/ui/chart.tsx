import * as ChartsPrimitive from "solid-charts";
import {
  type ComponentProps,
  createContext,
  createUniqueId,
  For,
  type JSX,
  mergeProps,
  Show,
  splitProps,
  useContext,
  type ValidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: JSX.Element;
    icon?: ValidComponent;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps>();

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer(
  props: ComponentProps<"div"> & {
    config: ChartConfig;
    children: ComponentProps<typeof ChartsPrimitive.Chart>["children"];
  },
) {
  const [local, rest] = splitProps(props, [
    "id",
    "class",
    "children",
    "config",
  ]);

  const uniqueId = createUniqueId();
  const chartId = `chart-${local.id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config: local.config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        class={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          local.class,
        )}
        {...rest}
      >
        <ChartStyle id={chartId} config={local.config} />
        <ChartsPrimitive.Chart>{local.children}</ChartsPrimitive.Chart>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = (props: { id: string; config: ChartConfig }) => {
  const [local, rest] = splitProps(props, ["id", "config"]);

  const colorConfig = () =>
    Object.entries(local.config).filter(
      ([, config]) => config.theme || config.color,
    );

  const styles = () => {
    return Object.entries(THEMES)
      .map(
        ([theme, prefix]) => `
${prefix} [data-chart=${local.id}] {
${colorConfig()
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
      )
      .join("\n");
  };

  return (
    <Show when={colorConfig()}>
      <style>{styles()}</style>
    </Show>
  );
};

const ChartTooltip = ChartsPrimitive.AxisTooltip;

function ChartTooltipContent(
  props: ComponentProps<typeof ChartsPrimitive.AxisTooltip> &
    ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    },
) {
  const defaultedProps = mergeProps(
    {
      indicator: "dot",
      hideLabel: false,
      hideIndicator: false,
    } satisfies Partial<typeof props>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "active",
    "payload",
    "class",
    "indicator",
    "hideLabel",
    "hideIndicator",
    "label",
    "labelFormatter",
    "labelClassName",
    "formatter",
    "color",
    "nameKey",
    "labelKey",
  ]);

  const { config } = useChart();

  // [ label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey ]
  // const tooltipLabel = createMemo(() => {
  //   if (local.hideLabel || !local.payload?.length) {
  //     return null;
  //   }
  //
  //   const [item] = local.payload;
  //   const key = `${local.labelKey || item?.dataKey || item?.name || "value"}`;
  //   const itemConfig = getPayloadConfigFromPayload(config, item, key);
  //   const value =
  //     !local.labelKey && typeof local.label === "string"
  //       ? config[local.label as keyof typeof config]?.label || local.label
  //       : itemConfig?.label;
  //
  //   if (labelFormatter) {
  //     return (
  //       <div class={cn("font-medium", local.labelClassName)}>
  //         {labelFormatter(value, payload)}
  //       </div>
  //     );
  //   }
  //
  //   if (!value) {
  //     return null;
  //   }
  //
  //   return <div class={cn("font-medium", local.labelClassName)}>{value}</div>;
  // });

  const nestLabel = local.payload.length === 1 && local.indicator !== "dot";

  return (
    <Show when={local.active && local.payload.length}>
      <div
        class={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          local.class,
        )}
      >
        <Show when={!nestLabel}>{tooltipLabel()}</Show>
        <div class="grid gap-1.5">
          <For each={local.payload.filter((item) => item.type !== "none")}>
            {(item, index) => {
              const key = `${local.nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor =
                local.color || item.payload.fill || item.color;

              return (
                <div
                  class={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    local.indicator === "dot" && "items-center",
                  )}
                >
                  <Show
                    when={
                      local.formatter && item?.value !== undefined && item.name
                    }
                    fallback={
                      <>
                        <Show
                          when={itemConfig?.icon}
                          fallback={
                            <Show when={!local.hideIndicator}>
                              <div
                                class={cn(
                                  "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                                  local.indicator === "dot" && "h-2.5 w-2.5",
                                  local.indicator === "line" && "w-1",
                                  local.indicator === "dashed" &&
                                    "w-0 border-[1.5px] border-dashed bg-transparent",
                                  local.indicator === "dashed" &&
                                    nestLabel &&
                                    "my-0.5",
                                )}
                                style={
                                  {
                                    "--color-bg": indicatorColor,
                                    "--color-border": indicatorColor,
                                  } as JSX.CSSProperties
                                }
                              />
                            </Show>
                          }
                        >
                          {(Icon) => <Dynamic component={Icon()} />}
                        </Show>
                        <div
                          class={cn(
                            "flex flex-1 justify-between leading-none",
                            nestLabel ? "items-end" : "items-center",
                          )}
                        >
                          <div class="grid gap-1.5">
                            <Show when={nestLabel}>{tooltipLabel()}</Show>
                            <span class="text-muted-foreground">
                              {itemConfig?.label || item.name}
                            </span>
                          </div>
                          <Show when={item.value}>
                            <span class="font-medium font-mono text-foreground tabular-nums">
                              {item.value.toLocaleString()}
                            </span>
                          </Show>
                        </div>
                      </>
                    }
                  >
                    {local.formatter(
                      item.value,
                      item.name,
                      item,
                      index,
                      item.payload,
                    )}
                  </Show>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}

const ChartLegend = ChartsPrimitive.Legend;

function ChartLegendContent(
  props: ComponentProps<"div"> &
    Pick<ChartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    },
) {
  const defaultedProps = mergeProps(
    {
      hideIcon: false,
      verticalAlign: "bottom",
    },
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "hideIcon",
    "payload",
    "verticalAlign",
    "nameKey",
  ]);

  const { config } = useChart();

  return (
    <Show when={local.payload.length}>
      <div
        class={cn(
          "flex items-center justify-center gap-4",
          local.verticalAlign === "top" ? "pb-3" : "pt-3",
          local.class,
        )}
      >
        <For each={local.payload.filter((item) => item.type !== "none")}>
          {(item) => {
            const key = `${local.nameKey || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            return (
              <div
                class={cn(
                  "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
                )}
              >
                <Show
                  when={itemConfig?.icon && !local.hideIcon}
                  fallback={
                    <div
                      class="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{
                        "background-color": item.color,
                      }}
                    />
                  }
                >
                  <Dynamic component={itemConfig?.icon} />
                </Show>
                {itemConfig?.label}
              </div>
            );
          }}
        </For>
      </div>
    </Show>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
