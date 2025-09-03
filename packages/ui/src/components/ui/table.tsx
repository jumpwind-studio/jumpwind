import { cn } from "@/components/ui/utils";
import { type ComponentProps, splitProps } from "solid-js";

function Table(props: ComponentProps<"table">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class="relative w-full overflow-x-auto" data-slot="table-container">
      <table
        class={cn("w-full caption-bottom text-sm", local.class)}
        data-slot="table"
        {...rest}
      />
    </div>
  );
}

function TableHeader(props: ComponentProps<"thead">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <thead
      class={cn("[&_tr]:border-b", local.class)}
      data-slot="table-header"
      {...rest}
    />
  );
}

function TableBody(props: ComponentProps<"tbody">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <tbody
      class={cn("[&_tr:last-child]:border-0", local.class)}
      data-slot="table-body"
      {...rest}
    />
  );
}

function TableFooter(props: ComponentProps<"tfoot">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <tfoot
      class={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        local.class,
      )}
      data-slot="table-footer"
      {...rest}
    />
  );
}

function TableRow(props: ComponentProps<"tr">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <tr
      class={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class,
      )}
      data-slot="table-row"
      {...rest}
    />
  );
}

function TableHead(props: ComponentProps<"th">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <th
      class={cn(
        "h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class,
      )}
      data-slot="table-head"
      {...rest}
    />
  );
}

function TableCell(props: ComponentProps<"td">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <td
      class={cn(
        "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        local.class,
      )}
      data-slot="table-cell"
      {...rest}
    />
  );
}

function TableCaption(props: ComponentProps<"caption">) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <caption
      class={cn("mt-4 text-muted-foreground text-sm", local.class)}
      data-slot="table-caption"
      {...rest}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
