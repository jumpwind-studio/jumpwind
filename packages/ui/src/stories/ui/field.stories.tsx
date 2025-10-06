import type { PickPartial } from "@jumpwind/utils";
import { type Component, type ComponentProps, createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../../ui/button.jsx";
import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
} from "../../ui/checkbox.jsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../../ui/field.jsx";
import { Input } from "../../ui/input.jsx";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "../../ui/radio-group.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select.jsx";
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "../../ui/slider.jsx";
import {
  Switch,
  SwitchControl,
  SwitchDescription,
  SwitchInput,
  SwitchLabel,
} from "../../ui/switch.jsx";
import {
  TextField,
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from "../../ui/text-field.jsx";
import { Textarea } from "../../ui/textarea.jsx";

type FieldStoryComponent = Component<
  PickPartial<ComponentProps<typeof Field>, "children">
>;

/**
 * Display a spinner.
 */
const meta: Meta<FieldStoryComponent> = {
  title: "@jumpwind/ui/Field",
  component: Field as FieldStoryComponent,
  parameters: {
    layout: "padded",
  },
  render: (_props) => (
    <div class="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <TextField as={Field}>
                <TextFieldLabel as={FieldLabel}>Name on Card</TextFieldLabel>
                <TextFieldInput as={Input} placeholder="Evil Rabbit" required />
              </TextField>
              <TextField as={Field}>
                <TextFieldLabel as={FieldLabel}>Card Number</TextFieldLabel>
                <TextFieldInput
                  as={Input}
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <TextFieldDescription>
                  Enter your 16-digit card number
                </TextFieldDescription>
              </TextField>
              <div class="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Month</FieldLabel>
                  <Select
                    defaultValue=""
                    placeholder="MM"
                    options={[
                      "01",
                      "02",
                      "03",
                      "04",
                      "05",
                      "06",
                      "07",
                      "08",
                      "09",
                      "10",
                      "11",
                      "12",
                    ]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Year</FieldLabel>
                  <Select
                    defaultValue=""
                    options={["2024", "2025", "2026", "2027", "2028", "2029"]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                    placeholder="YYYY"
                    sameWidth={false}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Field>
                <TextField as={Field}>
                  <TextFieldLabel as={FieldLabel}>CVV</TextFieldLabel>
                  <TextFieldInput as={Input} placeholder="123" required />
                </TextField>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox defaultChecked>
                  <CheckboxInput />
                  <CheckboxControl />
                </Checkbox>
                <FieldLabel class="font-normal">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Comments</FieldLabel>
                <Textarea
                  placeholder="Add any additional comments"
                  class="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  ),
} satisfies Meta<FieldStoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  name: "Default",
};
export const InputStory: Story = {
  name: "Input",
  render: () => (
    <div class="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <TextField as={Field}>
            <TextFieldLabel as={FieldLabel}>Username</TextFieldLabel>
            <TextFieldInput as={Input} type="text" placeholder="Max Leiter" />
            <TextFieldDescription as={FieldDescription}>
              Choose a unique username for your account.
            </TextFieldDescription>
          </TextField>
          <TextField as={Field}>
            <TextFieldLabel as={FieldLabel}>Password</TextFieldLabel>
            <TextFieldDescription as={FieldDescription}>
              Must be at least 8 characters long.
            </TextFieldDescription>
            <TextFieldInput as={Input} type="password" placeholder="********" />
          </TextField>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <div class="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Feedback</FieldLabel>
            <Textarea
              placeholder="Your feedback helps us improve..."
              rows={4}
            />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};
export const SelectStory: Story = {
  name: "Select",
};

export const SliderStory: Story = {
  name: "Slider",
  render: () => {
    const [values, setValues] = createSignal<[number, number]>([200, 800]);

    return (
      <div class="w-full max-w-md">
        <Slider
          as={Field}
          value={values()}
          onChange={setValues}
          maxValue={1000}
          minValue={0}
          step={10}
          getValueLabel={(params) =>
            `Set your budget range $${params.values[0]} - $${params.values[1]}.`
          }
        >
          <SliderLabel as={FieldTitle}>Price Range</SliderLabel>
          <SliderValueLabel
            as={FieldDescription}
            class="font-medium tabular-nums"
          />
          <SliderTrack class="mt-2 w-full" aria-label="Price Range">
            <SliderFill />
            <SliderThumb />
            <SliderThumb />
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const FieldsetStory: Story = {
  name: "Fieldset",
  render: () => (
    <div class="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>
          We need your address to deliver your order.
        </FieldDescription>
        <FieldGroup>
          <TextField as={Field}>
            <TextFieldLabel as={FieldLabel}>Street Address</TextFieldLabel>
            <TextFieldInput as={Input} type="text" placeholder="123 Main St" />
          </TextField>
          <div class="grid grid-cols-2 gap-4">
            <TextField as={Field}>
              <TextFieldLabel as={FieldLabel}>City</TextFieldLabel>
              <TextFieldInput as={Input} type="text" placeholder="New York" />
            </TextField>
            <TextField>
              <TextFieldLabel as={FieldLabel}>Postal Code</TextFieldLabel>
              <TextFieldInput as={Input} type="text" placeholder="90502" />
            </TextField>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
};

export const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => (
    <div class="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">
            Show these items on the desktop
          </FieldLegend>
          <FieldDescription>
            Select the items you want to show on the desktop.
          </FieldDescription>
          <FieldGroup class="gap-3">
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} defaultChecked class="font-normal">
                Hard disks
              </CheckboxLabel>
            </Checkbox>
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                External disks
              </CheckboxLabel>
            </Checkbox>
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                CDs, DVDs, and iPods
              </CheckboxLabel>
            </Checkbox>
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                Connected servers
              </CheckboxLabel>
            </Checkbox>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Checkbox as={Field} orientation="horizontal" defaultChecked>
          <CheckboxInput />
          <CheckboxControl />
          <FieldContent>
            <CheckboxLabel as={FieldLabel}>
              Sync Desktop & Documents folders
            </CheckboxLabel>
            <CheckboxDescription as={FieldDescription}>
              Your Desktop & Documents folders are being synced with iCloud
              Drive. You can access them from other devices.
            </CheckboxDescription>
          </FieldContent>
        </Checkbox>
      </FieldGroup>
    </div>
  ),
};

export const RadioStory: Story = {
  name: "Radio",
  render: () => (
    <div class="w-full max-w-md">
      <RadioGroup as={FieldSet} defaultValue="monthly">
        <RadioGroupLabel as={FieldLabel}>Subscription Plan</RadioGroupLabel>
        <RadioGroupDescription as={FieldDescription}>
          Yearly and lifetime plans offer significant savings.
        </RadioGroupDescription>
        <Field>
          <RadioGroupItem as={Field} value="monthly" orientation="horizontal">
            <RadioGroupItemInput />
            <RadioGroupItemControl />
            <RadioGroupItemLabel as={FieldLabel} class="font-normal">
              Monthly ($9.99/month)
            </RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem as={Field} value="yearly" orientation="horizontal">
            <RadioGroupItemInput />
            <RadioGroupItemControl />
            <RadioGroupItemLabel as={FieldLabel} class="font-normal">
              Yearly ($99.99/year)
            </RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem as={Field} value="lifetime" orientation="horizontal">
            <RadioGroupItemInput />
            <RadioGroupItemControl />
            <RadioGroupItemLabel as={FieldLabel} class="font-normal">
              Lifetime ($299.99)
            </RadioGroupItemLabel>
          </RadioGroupItem>
        </Field>
      </RadioGroup>
    </div>
  ),
};

export const SwitchStory: Story = {
  name: "Switch",
  render: () => (
    <div class="w-full max-w-md">
      <Switch as={Field} orientation="horizontal">
        <SwitchInput />
        <FieldContent>
          <SwitchLabel as={FieldLabel}>Multi-factor authentication</SwitchLabel>
          <SwitchDescription as={FieldDescription}>
            Enable multi-factor authentication. If you do not have a two-factor
            device, you can use a one-time code sent to your email.
          </SwitchDescription>
        </FieldContent>
        <SwitchControl />
      </Switch>
    </div>
  ),
};

export const ChoiceCardStory: Story = {
  name: "Choice Card",
  render: () => (
    <div class="w-full max-w-md">
      <FieldGroup>
        <RadioGroup as={FieldSet} defaultValue="kubernetes">
          <RadioGroupLabel as={FieldLabel}>Compute Environment</RadioGroupLabel>
          <RadioGroupDescription as={FieldDescription}>
            Select the compute environment for your cluster.
          </RadioGroupDescription>
          <RadioGroupItem value="kubernetes">
            <RadioGroupItemLabel as={FieldLabel}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s configured cluster.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem value="vm">
            <FieldLabel as={RadioGroupItemLabel}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a VM configured cluster to run GPU workloads.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroupItem>
        </RadioGroup>
      </FieldGroup>
    </div>
  ),
};

export const FieldGroupStory: Story = {
  name: "Field Group",
  render: () => (
    <div class="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Responses</FieldLabel>
          <FieldDescription>
            Get notified when ChatGPT responds to requests that take time, like
            research or image generation.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Checkbox
              as={Field}
              orientation="horizontal"
              defaultChecked
              disabled
            >
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                Push notifications
              </CheckboxLabel>
            </Checkbox>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Tasks</FieldLabel>
          <FieldDescription>
            Get notified when tasks you&apos;ve created have updates.{" "}
            <a href="#">Manage tasks</a>
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                Push notifications
              </CheckboxLabel>
            </Checkbox>
            <Checkbox as={Field} orientation="horizontal">
              <CheckboxInput />
              <CheckboxControl />
              <CheckboxLabel as={FieldLabel} class="font-normal">
                Email notifications
              </CheckboxLabel>
            </Checkbox>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  ),
};
