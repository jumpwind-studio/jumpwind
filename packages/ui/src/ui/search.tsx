import { isFunction } from "@corvu/utils";
import createOnce from "@corvu/utils/create/once";
import * as SearchPrimitive from "@kobalte/core/search";
import type { ComboboxControlState as SearchControlState } from "@kobalte/core/src/combobox/combobox-control.jsx";
import SearchIcon from "lucide-solid/icons/search";
import XIcon from "lucide-solid/icons/x";
import {
  type Accessor,
  type ComponentProps,
  createContext,
  createSignal,
  type JSX,
  mergeProps,
  type Setter,
  Show,
  splitProps,
  untrack,
  useContext,
} from "solid-js";
import { cn } from "@/lib/utils";
import { Button } from "./button.jsx";
import { Input } from "./input.jsx";
import { Spinner } from "./spinner.jsx";

interface SearchContextValue {
  query: Accessor<string>;
  setQuery: Setter<string>;
}

const SearchContext = createContext<SearchContextValue>();

function useSearch() {
  const initial = SearchPrimitive.useSearchContext();
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("useSearch must be used within a Search");
  }

  return { ...initial, ...searchContext };
}

function Search<TOption>(
  props: ComponentProps<typeof SearchPrimitive.Root<TOption>>,
) {
  const defaultedProps = mergeProps(
    {
      debounceOptionsMillisecond: 500,
      triggerMode: "input",
    } satisfies Partial<ComponentProps<typeof SearchPrimitive.Root<TOption>>>,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "onChange",
    "onInputChange",
  ]);

  const [query, setQuery] = createSignal<string>("");

  const onInputChange = (value: string) => {
    local.onInputChange?.(value);
    if (value === "") setQuery("");
  };

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <SearchPrimitive.Root<TOption, never, "div">
        data-slot="search"
        onInputChange={onInputChange}
        {...rest}
      />
    </SearchContext.Provider>
  );
}

function SearchHiddenSelect(
  props: ComponentProps<typeof SearchPrimitive.HiddenSelect>,
) {
  return (
    <SearchPrimitive.HiddenSelect data-slot="search-hidden-select" {...props} />
  );
}

function SearchInput(props: ComponentProps<typeof SearchPrimitive.Input>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SearchPrimitive.Input
      data-slot="search-input"
      as={Input}
      class={cn(
        "inline-flex w-full pl-8 data-expanded:rounded-sm",
        local.class,
      )}
      {...rest}
    />
  );
}

function SearchControl<TOption>(
  props: ComponentProps<typeof SearchPrimitive.Control<TOption>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  const memoizedChildren = createOnce(() => local.children);
  const resolveChildren = (state: SearchControlState<TOption>) => {
    const children = memoizedChildren()();
    return isFunction(children) ? children(state) : children;
  };
  const search = useSearch();

  return (
    <SearchPrimitive.Control<TOption>
      data-slot="search-control"
      class={cn("relative isolate", local.class)}
      {...rest}
    >
      {(state) => (
        <>
          <SearchPrimitive.Indicator
            loadingComponent={
              <SearchPrimitive.Icon class="absolute left-2 flex size-4 h-full items-center justify-center opacity-50">
                <Spinner />
              </SearchPrimitive.Icon>
            }
          >
            <SearchPrimitive.Icon class="absolute left-2 flex size-4 h-full items-center justify-center opacity-50">
              <SearchIcon class="size-4 opacity-75" />
            </SearchPrimitive.Icon>
          </SearchPrimitive.Indicator>
          <Show
            when={search.query() !== "" || state.selectedOptions().length !== 0}
          >
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log("clicked!!");
                state.clear();
                search.setQuery(() => "");
              }}
              class="absolute right-2 flex size-4 h-full items-center justify-center rounded-full opacity-50"
            >
              <XIcon class="size-4" />
            </Button>
          </Show>
          {untrack(() => resolveChildren(state))}
        </>
      )}
    </SearchPrimitive.Control>
  );
}

function SearchContent<TOption>(
  props: ComponentProps<typeof SearchPrimitive.Content> & {
    position?: "item-aligned" | "popper";
    fallback?: JSX.Element;
  },
) {
  const defaultedProps = mergeProps(
    {
      position: "popper",
    } satisfies typeof props,
    props,
  );

  const [local, rest] = splitProps(defaultedProps, [
    "class",
    "position",
    "fallback",
    "children",
  ]);

  return (
    <SearchPrimitive.Portal>
      <SearchPrimitive.Content
        data-slot="search-content"
        data-position={local.position}
        onCloseAutoFocus={(e) => e.preventDefault()}
        class={cn(
          "data-closed:fade-out-0 data-expanded:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[placement*=bottom]:slide-in-from-top-2 data-[placement*=left]:slide-in-from-right-2 data-[placement*=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 relative z-50 max-h-(-kb-popper-available-height) min-w-32 origin-(--kb-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-closed:animate-out data-expanded:animate-in",
          local.position === "popper" &&
            "data-[placement*=left]:-translate-x-1 data-[placement*=top]:-translate-y-1 data-[placement*=right]:translate-x-1 data-[placement*=bottom]:translate-y-1",
          local.class,
        )}
        {...rest}
      >
        <SearchPrimitive.Listbox<TOption>
          data-slot="search-content"
          class={cn(
            "p-1",
            local.position === "popper" &&
              "h-(--kb-popper-available-height) w-full min-w-(--kb-popper-available-width) scroll-my-1",
          )}
        />
        <SearchPrimitive.NoResult data-slot="search-empty">
          {local.fallback}
        </SearchPrimitive.NoResult>
      </SearchPrimitive.Content>
    </SearchPrimitive.Portal>
  );
}

function SearchSection(props: ComponentProps<typeof SearchPrimitive.Section>) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <SearchPrimitive.Section
      data-slot="search-section"
      class={cn("px-2 py-1.5 text-muted-foreground text-xs", local.class)}
      {...rest}
    />
  );
}

function SearchItem(props: ComponentProps<typeof SearchPrimitive.Item>) {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <SearchPrimitive.Item
      data-slot="search-item"
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...rest}
    >
      <SearchPrimitive.ItemLabel class="px-2 py-1.5 font-semibold text-sm">
        {local.children}
      </SearchPrimitive.ItemLabel>
    </SearchPrimitive.Item>
  );
}

function SearchItemDescription(
  props: ComponentProps<typeof SearchPrimitive.ItemDescription>,
) {
  return (
    <SearchPrimitive.ItemDescription
      data-slot="search-item-description"
      {...props}
    />
  );
}

function SearchLabel(props: ComponentProps<typeof SearchPrimitive.Label>) {
  return <SearchPrimitive.Label data-slot="search-label" {...props} />;
}

function SearchDescription(
  props: ComponentProps<typeof SearchPrimitive.Description>,
) {
  return (
    <SearchPrimitive.Description data-slot="search-description" {...props} />
  );
}

function SearchError(props: ComponentProps<"div">) {
  return <div data-slot="search-error" {...props} />;
}

export {
  Search,
  SearchHiddenSelect,
  SearchContent,
  SearchInput,
  SearchControl,
  SearchSection,
  SearchItem,
  SearchItemDescription,
  // Forms
  SearchLabel,
  SearchDescription,
  SearchError,
  // Hooks
  useSearch,
};
