import CalendarIcon from "lucide-solid/icons/calendar";
import { createSignal, Show } from "solid-js";
import { cn } from "@/registry/jumpwind/lib/utils";
import { Button } from "@/registry/jumpwind/ui/button";
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
} from "@/registry/jumpwind/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/jumpwind/ui/popover";

export function DatePicker() {
  const [date, setDate] = createSignal<Date | null>(null);

  return (
    <Popover>
      <PopoverTrigger
        as={Button}
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !date() && "text-muted-foreground",
        )}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <Show when={date()} fallback={<span>Pick a date</span>}>
          {(date) => date().toLocaleString("en-US", { day: "2-digit" })}
        </Show>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          mode="single"
          onValueChange={(date) => setDate(date)}
          value={date()}
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
      </PopoverContent>
    </Popover>
  );
}
