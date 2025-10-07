import type { PickPartial } from "@jumpwind/utils";
import { type Component, type ComponentProps, Index } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination.jsx";

type PaginationStoryComponent = Component<
  PickPartial<ComponentProps<typeof Pagination>, "children">
>;

/**
 * Pagination with page navigation, next and previous links.
 */
const meta = {
  title: "@jumpwind/ui/Pagination",
  component: Pagination as PaginationStoryComponent,
  argTypes: {},
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <Index each={[1, 2, 3, 4]}>
          {(index) => (
            <PaginationItem>
              <PaginationLink href="#" isActive={index() === 1}>
                {index()}
              </PaginationLink>
            </PaginationItem>
          )}
        </Index>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<PaginationStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the pagination.
 */
export const Default: Story = {};
