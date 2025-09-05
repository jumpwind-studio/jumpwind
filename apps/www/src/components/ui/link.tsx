import { Link as LinkComponent } from "@jumpwind/ui/link";
import {
  createLink,
  type LinkComponent as TanstackLinkComponent,
} from "@tanstack/solid-router";

const CreatedLinkComponent = createLink(LinkComponent);

export const Link: TanstackLinkComponent<typeof LinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
