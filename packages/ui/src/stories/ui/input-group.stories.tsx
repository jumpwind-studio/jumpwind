import type { PickPartial } from "@jumpwind/utils";
import ArrowUpIcon from "lucide-solid/icons/arrow-up";
import CheckIcon from "lucide-solid/icons/check";
import ChevronDownIcon from "lucide-solid/icons/chevron-down";
import ComputerIcon from "lucide-solid/icons/computer";
import CopyIcon from "lucide-solid/icons/copy";
import IconCornerDownLeft from "lucide-solid/icons/corner-down-left";
import CreditCardIcon from "lucide-solid/icons/credit-card";
import HelpCircleIcon from "lucide-solid/icons/help-circle";
import InfoCircleIcon from "lucide-solid/icons/info";
import InfoIcon from "lucide-solid/icons/info";
import Link2Icon from "lucide-solid/icons/link-2";
import LoaderIcon from "lucide-solid/icons/loader";
import MailIcon from "lucide-solid/icons/mail";
import MoreHorizontalIcon from "lucide-solid/icons/more-horizontal";
import PlusIcon from "lucide-solid/icons/plus";
import RefreshCwIcon from "lucide-solid/icons/refresh-cw";
import SearchIcon from "lucide-solid/icons/search";
import StarIcon from "lucide-solid/icons/star";
import { type Component, type ComponentProps, createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { cn } from "../../lib/utils.js";
import { ButtonGroup, ButtonGroupText } from "../../ui/button-group.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.jsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../../ui/input-group.jsx";
import { Label } from "../../ui/label.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.jsx";
import { Separator } from "../../ui/separator.jsx";
import { Spinner } from "../../ui/spinner.jsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.jsx";

type InputGroupStoryComponent = Component<
  PickPartial<ComponentProps<typeof InputGroup>, "children">
>;

/**
 * Used to display textual user input from keyboard.
 */
const meta: Meta<InputGroupStoryComponent> = {
  title: "@jumpwind/ui/InputGroup",
  component: InputGroup as InputGroupStoryComponent,
  parameters: {
    layout: "padded",
  },
  render: (props) => (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup {...props}>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="example.com" class="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              as={InputGroupButton}
              class="rounded-full"
              size="icon-xs"
            >
              <InfoCircleIcon />
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            class="rounded-full"
            size="icon-xs"
          >
            <PlusIcon />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger as={InputGroupButton} variant="ghost">
              Auto
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              class="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText class="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" class="!h-4" />
          <InputGroupButton
            variant="default"
            class="rounded-full"
            size="icon-xs"
            disabled
          >
            <ArrowUpIcon />
            <span class="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div class="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckIcon class="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
} satisfies Meta<InputGroupStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  name: "Default",
};

export const IconStory: Story = {
  name: "Icon",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup {...props}>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/**
 * Display additional text information alongside inputs
 */
export const TextStory: Story = {
  name: "Text",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup {...props}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" class="!pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText class="text-muted-foreground text-xs">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const ButtonStory: Story = {
  name: "Button",
  render: (props) => {
    const [isCopied, setIsCopied] = createSignal<boolean>(false);
    const [isFavorite, setIsFavorite] = createSignal<boolean>(false);

    return (
      <div class="grid w-full max-w-sm gap-6">
        <InputGroup {...props}>
          <InputGroupInput placeholder="https://x.com/shadcn" readonly />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs">
              {isCopied() ? <CheckIcon /> : <CopyIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup class="[--radius:9999px]" {...props}>
          <Popover>
            <PopoverTrigger as={InputGroupAddon}>
              <InputGroupButton variant="secondary" size="icon-xs">
                <InfoCircleIcon />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              class="flex flex-col gap-1 rounded-xl text-sm"
            >
              <p class="font-medium">Your connection is not secure.</p>
              <p>
                You should not enter any sensitive information on this site.
              </p>
            </PopoverContent>
          </Popover>
          <InputGroupAddon class="pl-1.5 text-muted-foreground">
            https://
          </InputGroupAddon>
          <InputGroupInput id="input-secure-19" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsFavorite((isFavorite) => !isFavorite)}
              size="icon-xs"
            >
              <StarIcon
                data-favorite={isFavorite()}
                class="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup {...props}>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
};

export const TooltipStory: Story = {
  name: "Tooltip",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup {...props}>
        <InputGroupInput placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              as={InputGroupButton}
              variant="ghost"
              aria-label="Info"
              size="icon-xs"
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Password must be at least 8 characters</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput placeholder="Your email address" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              as={InputGroupButton}
              variant="ghost"
              aria-label="Help"
              size="icon-xs"
            >
              <HelpCircleIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <Tooltip placement="left">
          <TooltipTrigger>
            <InputGroupAddon>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Help"
              >
                <HelpCircleIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click for help with API keys</p>
          </TooltipContent>
        </Tooltip>
        <InputGroupInput placeholder="Enter API key" />
      </InputGroup>
    </div>
  ),
};

export const TextareaStory: Story = {
  name: "Textarea",
  render: (props) => (
    <div class="grid w-full max-w-md gap-4">
      <InputGroup {...props}>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          class="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" class="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" class="ml-auto" variant="default">
            Run <IconCornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" class="border-b">
          <InputGroupText class="font-medium font-mono">
            <ComputerIcon />
            script.js
          </InputGroupText>
          <InputGroupButton class="ml-auto" size="icon-xs">
            <RefreshCwIcon />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const SpinnerStory: Story = {
  name: "Spinner",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled {...props}>
        <InputGroupInput placeholder="Searching..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled {...props}>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled {...props}>
        <InputGroupInput placeholder="Saving changes..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled {...props}>
        <InputGroupInput placeholder="Refreshing data..." disabled />
        <InputGroupAddon>
          <LoaderIcon class="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText class="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const LabelStory: Story = {
  name: "Label",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup {...props}>
        <InputGroupInput id="email" placeholder="shadcn" />
        <InputGroupAddon>
          <Label for="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props}>
        <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
        <InputGroupAddon align="block-start">
          <Label for="email-2" class="text-foreground">
            Email
          </Label>
          <Tooltip>
            <TooltipTrigger
              as={InputGroupButton}
              variant="ghost"
              aria-label="Help"
              class="ml-auto rounded-full"
              size="icon-xs"
            >
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const DropdownStory: Story = {
  name: "Dropdown",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-4">
      <InputGroup {...props}>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              as={InputGroupButton}
              variant="ghost"
              aria-label="More"
              size="icon-xs"
            >
              <MoreHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Copy path</DropdownMenuItem>
              <DropdownMenuItem>Open location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...props} class={cn("[--radius:1rem]", props.class)}>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              as={InputGroupButton}
              variant="ghost"
              class="!pr-1.5 text-xs"
            >
              Search In... <ChevronDownIcon class="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="[--radius:0.95rem]">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Blog Posts</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const ButtonGroupStory: Story = {
  name: "Button Group",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-6">
      <ButtonGroup>
        <ButtonGroupText as={Label} for="url">
          https://
        </ButtonGroupText>
        <InputGroup {...props}>
          <InputGroupInput id="url" />
          <InputGroupAddon align="inline-end">
            <Link2Icon />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  ),
};

export const CustomInputStory: Story = {
  name: "Custom Input",
  render: (props) => (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup {...props}>
        {/* <TextareaAutosize */}
        {/*   data-slot="input-group-control" */}
        {/*   placeholder="Autoresize textarea..." */}
        {/*   class="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm" */}
        {/* /> */}
        <InputGroupAddon align="block-end">
          <InputGroupButton class="ml-auto" size="sm" variant="default">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
