import * as CalendarIcon from "lucide-solid/icons/calendar";
import * as ChevronDownIcon from "lucide-solid/icons/chevron-down";
import { createSignal, Show } from "solid-js";
import { action } from "storybook/actions";
import { expect, userEvent, waitFor, within } from "storybook/test";
// Replace nextjs-vite with the name of your framework
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "@/registry/jumpwind/ui/button";
import { Calendar } from "@/registry/jumpwind/ui/calendar";
import { DatePicker } from "@/registry/jumpwind/ui/date-picker";
import { Input } from "@/registry/jumpwind/ui/input";
import { Label } from "@/registry/jumpwind/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/jumpwind/ui/popover";

/**
 * A window overlaid on either the primary window or another dialog window,
 * rendering the content underneath inert.
 */
const meta = {
  title: "@jumpwind/ui/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Combination of the calendar and a button that opens a popover.
 */
export const WithPopover: Story = {
  args: {
    captionLayout: "dropdown",
  },

  render: (args) => {
    const [open, setOpen] = createSignal(false);
    const [date, setDate] = createSignal<Date | null>(null);

    return (
      <div class="flex flex-col gap-3">
        <Label for="date" class="px-1">
          Date of birth
        </Label>
        <Popover open={open()} onOpenChange={setOpen}>
          <PopoverTrigger
            as={Button}
            variant="outline"
            id="date"
            class="w-48 justify-between font-normal"
          >
            <Show when={date()} fallback="Select date">
              {(d) => d().toLocaleDateString()}
            </Show>
            <ChevronDownIcon />
          </PopoverTrigger>
          <PopoverContent class="w-auto overflow-hidden p-0" align="start">
            <Calendar
              {...args}
              mode="single"
              value={date()}
              onValueChange={(date) => {
                setDate(date);
                setOpen(false);
                action("date selected")(date);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const ShouldOpenPopover: Story = {
  ...WithPopover,
  name: "when clicking the button, should open the popover to select a date",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await step("Open the popover", async () => {
      await userEvent.click(
        await canvas.findByRole("button", { name: "Date of birth" }),
      );
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(".rdp-root"),
        ).toBeVisible(),
      );
    });
    await step("Select a date", async () => {
      const dateButtons = await canvas.findAllByRole("button", {
        name: /1st/i,
      });
      await userEvent.click(dateButtons[0]);
    });
  },
};

const formatDate = (date: Date | null | undefined) => {
  return date
    ? date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
};

const isValidDate = (date: Date | undefined) =>
  date ? !Number.isNaN(date.getTime()) : false;

/**
 * Combination of the calendar and an input field that allows typing a date.
 */
export const WithInput: Story = {
  args: {
    captionLayout: "dropdown",
  },
  render: (args) => {
    const [open, setOpen] = createSignal(false);
    const [date, setDate] = createSignal<Date | null>(new Date("2025-06-01"));
    const [month, setMonth] = createSignal<Date | null>(date());
    const [value, setValue] = createSignal(formatDate(date()));

    return (
      <div class="flex flex-col gap-3">
        <Label for="date" class="px-1">
          Subscription Date
        </Label>
        <div class="relative flex gap-2">
          <Input
            id="date"
            value={value()}
            placeholder="June 01, 2025"
            class="bg-background pr-10"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(date)) {
                setDate(date);
                setMonth(date);
                action("date input changed")(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <Popover open={open()} onOpenChange={setOpen}>
            <PopoverTrigger
              as={Button}
              id="date-picker"
              variant="ghost"
              class="-translate-y-1/2 absolute top-1/2 right-2 size-6"
            >
              <CalendarIcon class="size-3.5" />
              <span class="sr-only">Select date</span>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              alignOffset={-8}
              sideOffset={10}
              class="w-auto overflow-hidden p-0"
            >
              <Calendar
                {...args}
                mode="single"
                month={month()}
                onMonthChange={setMonth}
                value={date()}
                onValueChange={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                  action("date selected")(date);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

export const ShouldEnterTextDate: Story = {
  ...WithInput,
  name: "when typing a valid date, should update the input and close the calendar",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const input = await canvas.findByRole("textbox", {
      name: "Subscription Date",
    });
    await step("type a date", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "July 21, 1999");
      await userEvent.keyboard("{enter}");
      expect(input).toHaveValue("July 21, 1999");
    });

    await step("check the calendar", async () => {
      await userEvent.click(
        await canvas.findByRole("button", { name: "Select date" }),
      );
      await waitFor(() =>
        expect(
          canvas.queryByRole("button", {
            name: "Wednesday, July 21st, 1999, selected",
          }),
        ).toBeVisible(),
      );
    });
  },
};

/**
 * Combination of the calendar and an input field that allows changing the time.
 */
export const WithDateTime: Story = {
  args: {
    captionLayout: "dropdown",
  },

  render: (args) => {
    const [open, setOpen] = createSignal(false);
    const [date, setDate] = createSignal<Date | null>(null);

    return (
      <div class="flex gap-4">
        <div class="flex flex-col gap-3">
          <Label for="date-picker" class="px-1">
            Date
          </Label>
          <Popover open={open()} onOpenChange={setOpen}>
            <PopoverTrigger
              as={Button}
              variant="outline"
              id="date-picker"
              class="w-32 justify-between font-normal"
            >
              <Show when={date()} fallback="Select date">
                {(d) => d().toLocaleDateString()}
              </Show>
              <ChevronDownIcon />
            </PopoverTrigger>
            <PopoverContent class="w-auto overflow-hidden p-0" align="start">
              <Calendar
                {...args}
                mode="single"
                value={date()}
                onValueChange={(date) => {
                  setDate(date);
                  setOpen(false);
                  action("date selected")(date);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div class="flex flex-col gap-3">
          <Label for="time-picker" class="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            disabled={!date()}
            defaultValue="10:30:00"
            onChange={(e) => {
              const d = date();
              if (!d) {
                return;
              }
              const [hours, minutes, seconds] = e.target.value
                .split(":")
                .map(Number);
              d.setHours(hours, minutes, seconds);
              setDate(d);
              action("time selected")(d);
            }}
            class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    );
  },
};

export const ShouldOpenCalendar: Story = {
  ...WithDateTime,
  name: "when clicking the date button, should open the calendar to select a date",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await step("Open the date popover", async () => {
      const dateInput = await canvas.findByLabelText("Date");
      await userEvent.click(dateInput);
      await waitFor(() =>
        expect(
          canvas.queryAllByRole("button", { name: /1st/i }).at(0),
        ).toBeVisible(),
      );
    });

    const dateButtons = await canvas.findAllByRole("button", { name: /1st/i });
    await userEvent.click(dateButtons[0]);

    await step("type a time", async () => {
      const timeInput = await canvas.findByLabelText("Time");
      await userEvent.click(timeInput);
      await userEvent.type(timeInput, "1");
    });
  },
};
