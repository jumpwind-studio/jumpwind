import { isFunction } from "@corvu/utils";
import createOnce from "@corvu/utils/create/once";
import * as CalendarPrimitive from "corvu/calendar";
import ChevronLeftIcon from "lucide-solid/icons/chevron-left";
import ChevronRightIcon from "lucide-solid/icons/chevron-right";
import {
  type Accessor,
  type ComponentProps,
  Index,
  type JSX,
  mergeProps,
  Show,
  splitProps,
  untrack,
} from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { buttonVariants } from "@/registry/jumpwind/ui/button";

const { format: formatYearLong } = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

const useCalendar = CalendarPrimitive.useContext;

export type CalendarMode = "single" | "multiple" | "range";

type ExtractCalendarProps<Mode extends CalendarMode> = Extract<
  CalendarPrimitive.RootProps,
  { mode: Mode }
>;

export type CalendarProps<Mode extends CalendarMode = "single"> =
  ExtractCalendarProps<Mode> & { class?: string };

function Calendar<const Mode extends CalendarMode = "single">(
  props: CalendarProps<Mode>,
) {
  const defaultedProps = mergeProps(
    { mode: "single" } satisfies Partial<CalendarProps<"single">>,
    props,
  );
  const [local, rest] = splitProps(defaultedProps, ["class"]);

  return (
    <div class={cn("w-fit space-y-1 p-3", local.class)}>
      <CalendarPrimitive.Root data-slot="calendar" {...rest} />
    </div>
  );
}

function CalendarHeader(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-slot="calendar-header"
      class={cn("flex items-center justify-between", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
}

function CalendarLabel(props: ComponentProps<typeof CalendarPrimitive.Label>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  const context = useCalendar<"single">();

  return (
    <CalendarPrimitive.Label
      data-slot="calendar-label"
      class={cn("font-medium text-sm", local.class)}
      {...rest}
    >
      <Show when={local.children} fallback={formatYearLong(context.month())}>
        {local.children}
      </Show>
    </CalendarPrimitive.Label>
  );
}

function CalendarNav(props: ComponentProps<typeof CalendarPrimitive.Nav>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarPrimitive.Nav
      data-slot="calendar-nav"
      class={buttonVariants({
        variant: "outline",
        class: [
          "size-7 rounded-sm bg-transparent p-0 opacity-50 hover:opacity-100",
          local.class,
        ],
      })}
      {...rest}
    >
      {local.children}
    </CalendarPrimitive.Nav>
  );
}

function CalendarPrevMonth(
  props: Omit<ComponentProps<typeof CalendarNav>, "action">,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarNav
      data-slot="calendar-prev-month"
      action="prev-month"
      aria-label="Go to previous month"
      class={cn("", local.class)}
      {...rest}
    >
      <Show when={local.children} fallback={<ChevronLeftIcon class="size-4" />}>
        {local.children}
      </Show>
    </CalendarNav>
  );
}

function CalendarNextMonth(
  props: Omit<ComponentProps<typeof CalendarNav>, "action">,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarNav
      data-slot="calendar-next-month"
      action="next-month"
      aria-label="Go to next month"
      class={cn("", local.class)}
      {...rest}
    >
      <Show
        when={local.children}
        fallback={<ChevronRightIcon class="size-4" />}
      >
        {local.children}
      </Show>
    </CalendarNav>
  );
}

function CalendarTable(props: ComponentProps<typeof CalendarPrimitive.Table>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarPrimitive.Table
      data-slot="calendar-table"
      class={cn("w-full border-collapse space-y-1", local.class)}
      {...rest}
    >
      {local.children}
    </CalendarPrimitive.Table>
  );
}

function CalendarHead(props: ComponentProps<"thead">) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <thead data-slot="calendar-head" class={cn("flex", local.class)} {...rest}>
      {local.children}
    </thead>
  );
}

function CalendarHeadRow(
  props: Omit<ComponentProps<"tr">, "children"> & {
    children: JSX.Element | ((weekday: Accessor<Date>) => JSX.Element);
  },
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  const context = useCalendar<"single">();

  // NOTE: Using `corvu` pattern for memoizing child components
  // Okay to remove if overkill
  const memoizedChildren = createOnce(() => local.children);

  return (
    <tr
      data-slot="calendar-head-row"
      class={cn("relative flex items-center justify-center pt-1", local.class)}
      {...rest}
    >
      <Index each={context.weekdays()}>
        {(weekday) => {
          const resolveChildren = () => {
            const children = memoizedChildren()();
            return isFunction(children) ? children(weekday) : children;
          };
          return untrack(() => resolveChildren());
        }}
      </Index>
    </tr>
  );
}

function CalendarHeadCell(
  props: ComponentProps<typeof CalendarPrimitive.HeadCell>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarPrimitive.HeadCell
      data-slot="calendar-head-cell"
      class={cn(
        "w-9 rounded-md font-normal text-[0.8rem] text-muted-foreground",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </CalendarPrimitive.HeadCell>
  );
}

function CalendarBody(
  props: Omit<ComponentProps<"tbody">, "children"> & {
    children: (week: Accessor<Date[]>) => JSX.Element;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  const context = useCalendar<"single">();

  // NOTE: Using `corvu` pattern for memoizing child components
  // Okay to remove if overkill
  const memoizedChildren = createOnce(() => local.children);

  return (
    <tbody
      data-slot="calendar-body"
      class={cn("flex flex-col", local.class)}
      {...rest}
    >
      <Index each={context.weeks()}>
        {(week) => {
          const resolveChildren = () => {
            const children = memoizedChildren()();
            return isFunction(children) ? children(week) : children;
          };
          return untrack(() => resolveChildren());
        }}
      </Index>
    </tbody>
  );
}

function CalendarRow(
  props: Omit<ComponentProps<"tr">, "children"> & {
    week: Date[];
    children: JSX.Element | ((day: Accessor<Date>) => JSX.Element);
  },
) {
  const [local, rest] = splitProps(props, ["week", "class", "children"]);

  // NOTE: Using `corvu` pattern for memoizing child components
  // Okay to remove if overkill
  const memoizedChildren = createOnce(() => local.children);

  return (
    <tr
      data-slot="calendar-row"
      class={cn("mt-2 flex w-full", local.class)}
      {...rest}
    >
      <Index each={local.week}>
        {(day) => {
          const resolveChildren = () => {
            const children = memoizedChildren()();
            return isFunction(children) ? children(day) : children;
          };
          return untrack(() => resolveChildren());
        }}
      </Index>
    </tr>
  );
}

function CalendarCell(props: ComponentProps<typeof CalendarPrimitive.Cell>) {
  const [local, rest] = splitProps(props, ["day", "class", "children"]);

  return (
    <CalendarPrimitive.Cell
      data-slot="calendar-cell"
      class={cn(
        "relative size-9 p-0 text-center text-sm",
        "focus-within:relative focus-within:z-20",
        "[&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        local.class,
      )}
      {...rest}
    >
      {local.children({ day: local.day })}
    </CalendarPrimitive.Cell>
  );
}

/** aka Day */
function CalendarCellTrigger(
  props: ComponentProps<typeof CalendarPrimitive.CellTrigger>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <CalendarPrimitive.CellTrigger
      data-slot="calendar-cell-trigger"
      class={buttonVariants({
        variant: "ghost",
        class: [
          "size-9 p-0 font-normal aria-selected:opacity-100",
          // selected
          "data-selected:bg-primary data-selected:text-primary-foreground data-selected:focus:bg-primary data-selected:focus:text-primary-foreground data-selected:hover:bg-primary data-selected:hover:text-primary-foreground",
          // today
          "data-today:bg-accent data-today:text-accent-foreground",
          // disabled
          "data-disabled:text-muted-foreground data-disabled:opacity-50",
          // in-range
          "data-in-range:aria-selected:bg-accent data-in-range:aria-selected:text-accent-foreground",
          local.class,
        ],
      })}
      {...rest}
    >
      {local.children}
    </CalendarPrimitive.CellTrigger>
  );
}

export {
  Calendar,
  CalendarNav,
  CalendarLabel,
  CalendarPrevMonth,
  CalendarNextMonth,
  CalendarHeader,
  CalendarTable,
  CalendarHead,
  CalendarHeadRow,
  CalendarHeadCell,
  CalendarBody,
  CalendarRow,
  CalendarCell,
  CalendarCellTrigger,
  // Hooks
  useCalendar,
};
