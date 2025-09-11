import createControllableSignal from "@corvu/utils/create/controllableSignal";
import CalendarIcon from "lucide-solid/icons/calendar";
import { type ComponentProps, Show, splitProps } from "solid-js";
import { cn } from "../lib/utils.js";
import { Button } from "./button.jsx"
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
} from "./calendar.jsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover.jsx"

type DatePickerProps = Partial<
  Pick<
    ComponentProps<typeof Popover>,
    "initialOpen" | "open" | "onOpenChange"
  > &
    Pick<ComponentProps<typeof PopoverTrigger>, "size" | "variant"> &
    Pick<
      ComponentProps<typeof Calendar<"single">>,
      "mode" | "initialValue" | "value" | "onValueChange"
    >
>;

export function DatePicker(props: DatePickerProps) {
  const [calendarProps, popoverProps, triggerProps] = splitProps(
    props,
    ["mode", "initialValue", "value", "onValueChange"],
    ["initialOpen", "open", "onOpenChange"],
    ["size", "variant"],
  );

  const [open, setOpen] = createControllableSignal({
    initialValue: popoverProps.initialOpen ?? false,
    value: () => popoverProps.open,
    onChange: popoverProps.onOpenChange,
  });

  const [date, setDate] = createControllableSignal({
    initialValue: calendarProps?.initialValue ?? null,
    value: () => calendarProps?.value ?? null,
    onChange: calendarProps?.onValueChange,
  });

  return (
    <Popover data-class="date-picker" open={open()} onOpenChange={setOpen}>
      <PopoverTrigger
        {...triggerProps}
        as={Button}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !date() && "text-muted-foreground",
        )}
      >
        <CalendarIcon class="mr-2 size-4" />
        <Show when={date()} fallback="Pick a date">
          {(date) => date().toLocaleString("en-US", { day: "2-digit" })}
        </Show>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar mode="single" value={date()} onValueChange={setDate}>
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
      </PopoverContent>
    </Popover>
  );
}
