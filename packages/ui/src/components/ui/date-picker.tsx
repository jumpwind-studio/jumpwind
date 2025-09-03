import { Button } from "@/components/ui/button";
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
} from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import CalendarIcon from "lucide-solid/icons/calendar";
import { createSignal, Show } from "solid-js";

export function DatePicker() {
  const [date, setDate] = createSignal<Date>();

  return (
    <Popover>
      <PopoverTrigger
        as={Button}
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !date() && "text-muted-foreground",
        )}
        variant="outline"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <Show when={date()} fallback={<span>Pick a date</span>} >
          {(date) => date()}
        </Show>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          mode="single"
          setValue={(date) => setDate(date)}
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
