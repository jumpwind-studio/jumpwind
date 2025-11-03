import type { DynamicProps } from "@corvu/utils/dynamic";
import Content, {
  type StepperContentCorvuProps as ContentCorvuProps,
  type StepperContentElementProps as ContentElementProps,
  type StepperContentProps as ContentProps,
  type StepperContentSharedElementProps as ContentSharedElementProps,
} from "./Content.jsx";
import {
  type StepperContextValue as ContextValue,
  useStepperContext as useContext,
} from "./context.js";
import Item, {
  type StepperItemChildrenProps as ItemChildrenProps,
  type StepperItemCorvuProps as ItemCorvuProps,
  type StepperItemElementProps as ItemElementProps,
  type StepperItemProps as ItemProps,
  type StepperItemSharedElementProps as ItemSharedElementProps,
} from "./Item.jsx";
import {
  type StepperItemContextValue as ItemContextValue,
  useStepperItemContext as useItemContext,
} from "./itemContext.js";
import Root, {
  type StepperRootChildrenProps as RootChildrenProps,
  type StepperRootProps as RootProps,
} from "./Root.jsx";
import Trigger, {
  type StepperTriggerCorvuProps as TriggerCorvuProps,
  type StepperTriggerElementProps as TriggerElementProps,
  type StepperTriggerProps as TriggerProps,
  type StepperTriggerSharedElementProps as TriggerSharedElementProps,
} from "./Trigger.jsx";

export type {
  RootProps,
  RootChildrenProps,
  ItemCorvuProps,
  ItemSharedElementProps,
  ItemElementProps,
  ItemProps,
  ItemChildrenProps,
  TriggerCorvuProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  ContentCorvuProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  ContextValue,
  ItemContextValue,
  DynamicProps,
};

export { Root, Item, Trigger, Content, useContext, useItemContext };

const Stepper = Object.assign(Root, {
  Item,
  Trigger,
  Content,
  useContext,
  useItemContext,
});

export default Stepper;
