import { Avatar, AvatarFallback, AvatarImage } from "@jumpwind/ui/avatar";
import { type ComponentProps, splitProps, useTransition } from "solid-js";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends ComponentProps<typeof Avatar> {
  user: {
    name: string;
    image: string;
  };
}

function UserAvatar(props: UserAvatarProps) {
  const [local, rest] = splitProps(props, ["class", "user"]);

  const [isPending] = useTransition();

  const name = () => (local.user.name ? local.user.name : "AU");

  return (
    <Avatar
      bool:data-loading={isPending()}
      class={cn(local.class, "group data-loading:animate-pulse")}
      {...rest}
    >
      <AvatarImage src={local.user.image} alt={local.user.name} />
      <AvatarFallback>{name().toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
