import type { PickPartial } from "@jumpwind/utils";
import { type Component, type ComponentProps, createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Search,
  SearchContent,
  SearchControl,
  SearchInput,
  SearchItem,
} from "../../ui/search.jsx";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Aubergine", value: "aubergine" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Carrot", value: "carrot" },
  { label: "Courgette", value: "courgette" },
  { label: "Leek", value: "leek" },
  { label: "Beef", value: "beef" },
  { label: "Chicken", value: "chicken" },
  { label: "Lamb", value: "lamb" },
  { label: "Pork", value: "pork" },
];

type Option = (typeof options)[number];

type SearchStoryComponent = Component<
  PickPartial<ComponentProps<typeof Search<Option>>, "children">
>;

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 */
const meta = {
  title: "@jumpwind/ui/Search",
  component: Search as SearchStoryComponent,
  argTypes: {
    options: {
      control: { type: "object" },
    },
  },
  args: {
    options: options,
    placeholder: "Search for food",
    optionValue: "value",
    optionTextValue: "label",
  },
  render: (props) => (
    <Search
      triggerMode="focus"
      options={props.options}
      optionValue="value"
      optionLabel="label"
      placeholder="Search for food…"
      itemComponent={(props) => (
        <SearchItem item={props.item}>{props.item.rawValue.label}</SearchItem>
      )}
    >
      <SearchControl aria-label="Food">
        <SearchInput />
      </SearchControl>
      <SearchContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        fallback="😬 No food found"
      />
    </Search>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<SearchStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the search.
 */
export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [options, setOptions] = createSignal<Option[]>(args.options);
    const [food, setFood] = createSignal<Option | null>(null);

    const queryFood = (str: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            setOptions(() =>
              args.options.filter((option) =>
                option.value.includes(str.toLowerCase()),
              ),
            ),
          );
        }, 1000);
      });
    };

    return (
      <>
        <Search
          triggerMode="focus"
          options={options()}
          onInputChange={queryFood}
          onChange={setFood}
          optionValue="value"
          optionLabel="label"
          placeholder="Search for food…"
          itemComponent={(props) => (
            <SearchItem item={props.item} class="search__item">
              {props.item.rawValue.label}
            </SearchItem>
          )}
        >
          <SearchControl aria-label="Food">
            <SearchInput />
          </SearchControl>
          <SearchContent
            onCloseAutoFocus={(e) => e.preventDefault()}
            fallback="😬 No food found"
          />
        </Search>
        <div>Food selected: {food()?.label}</div>
      </>
    );
  },
};
