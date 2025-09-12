import type { PickPartial } from "@jumpwind/utils";
import * as Duration from "effect/Duration";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { action } from "storybook/actions";
import { expect, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { cn } from "../../lib/utils.js";
import {
  Calendar,
  CalendarBody,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHead,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeadRow,
  CalendarLabel,
  CalendarNextMonth,
  CalendarPrevMonth,
  CalendarRow,
  CalendarTable,
} from "../../ui/calendar.jsx";

type CalendarStoryComponent = Component<
  PickPartial<
    ComponentProps<typeof Calendar<"single" | "multiple" | "range">>,
    "children"
  >
>;

/**
 * A date field component that allows users to enter and edit date.
 */
const meta = {
  title: "@jumpwind/ui/Calendar",
  component: Calendar as CalendarStoryComponent,
  argTypes: {
    contextId: { control: false },
    focusedDay: { control: { type: "date" } },
    fixedWeeks: { control: { type: "boolean" } },
  },
  args: {
    initialValue: new Date(),
    onValueChange: action("onValueChange"),
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    const [local, calendar, rest] = splitProps(
      args,
      ["class", "children"],
      ["mode", "value", "onValueChange", "initialValue"],
    );
    return (
      <Calendar<"single">
        class={cn("rounded-md border", local.class)}
        mode="single"
        initialValue={calendar.initialValue}
        value={calendar.value}
        onValueChange={calendar.onValueChange}
        {...rest}
      >
        <CalendarHeader>
          <CalendarPrevMonth />
          <CalendarLabel />
          <CalendarNextMonth />
        </CalendarHeader>
        <CalendarTable>
          <CalendarHead>
            <CalendarHeadRow>
              {(weekday) => (
                <CalendarHeadCell>
                  {weekday().toLocaleString("en", { weekday: "short" })}
                </CalendarHeadCell>
              )}
            </CalendarHeadRow>
          </CalendarHead>
          <CalendarBody>
            {(week) => (
              <CalendarRow week={week()}>
                {(day) => (
                  <CalendarCell>
                    <CalendarCellTrigger day={day()}>
                      {day().toLocaleString("en-US", { day: "2-digit" })}
                    </CalendarCellTrigger>
                  </CalendarCell>
                )}
              </CalendarRow>
            )}
          </CalendarBody>
        </CalendarTable>
      </Calendar>
    );
  },
} satisfies Meta<CalendarStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the calendar.
 */
export const Default: Story = {
  args: {
    mode: "single",
    initialValue: new Date(),
  },
};

/**
 * Use the `multiple` mode to select multiple dates.
 */
export const Multiple: Story = {
  args: {
    mode: "multiple",
    min: 1,
    initialValue: [
      new Date(Date.now()),
      new Date(Date.now() + Duration.toMillis("2 days")),
      new Date(Date.now() + Duration.toMillis("8 days")),
    ],
  },
};

/**
 * Use the `range` mode to select a range of dates.
 */
export const Range: Story = {
  args: {
    mode: "range",
    initialValue: {
      from: new Date(),
      to: new Date(Date.now() + Duration.toMillis("1 week")),
    },
  },
};

/**
 * Use the `disabled` prop to disable specific dates.
 */
export const Disabled: Story = {
  args: {
    disabled: (date) =>
      [
        date.getTime() + Duration.toMillis("1 day"),
        date.getTime() + Duration.toMillis("2 days"),
        date.getTime() + Duration.toMillis("3 days"),
        date.getTime() + Duration.toMillis("5 days"),
      ]?.some((dt) => date.getTime() === dt),
  },
};

/**
 * Use the `numberOfMonths` prop to display multiple months.
 */
export const MultipleMonths: Story = {
  args: {
    mode: "multiple",
    numberOfMonths: 2,
    max: 3,
    disableOutsideDays: false,
  },
};

export const ShouldChangeMonths: Story = {
  name: "when using the calendar navigation, should change months",
  tags: ["!dev", "!autodocs"],
  args: {
    initialMonth: new Date(2000, 8),
  },
  play: async ({ canvas }) => {
    const title = await canvas.findByText(/2000/i);
    const startTitle = title.textContent || "";
    const backBtn = await canvas.findByRole("button", {
      name: /previous/i,
    });
    const nextBtn = await canvas.findByRole("button", {
      name: /next/i,
    });
    const steps = 6;
    for (let i = 0; i < steps / 2; i++) {
      await userEvent.click(backBtn);
      expect(title).not.toHaveTextContent(startTitle);
    }
    for (let i = 0; i < steps; i++) {
      await userEvent.click(nextBtn);
      if (i === steps / 2 - 1) {
        expect(title).toHaveTextContent(startTitle);
        continue;
      }
      expect(title).not.toHaveTextContent(startTitle);
    }
  },
};
