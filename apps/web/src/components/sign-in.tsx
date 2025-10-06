import type { Avatar } from "@jumpwind/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@jumpwind/ui/dropdown-menu";
import type {
  DropdownMenuTriggerOptions,
  DropdownMenuTriggerRenderProps,
} from "@kobalte/core/dropdown-menu";
import type { PolymorphicCallbackProps } from "@kobalte/core/polymorphic";
import { useNavigate } from "@tanstack/solid-router";
import LogOutIcon from "lucide-solid/icons/log-out";
import MonitorCogIcon from "lucide-solid/icons/monitor-cog";
import MoonIcon from "lucide-solid/icons/moon";
import SettingsIcon from "lucide-solid/icons/settings";
import SunIcon from "lucide-solid/icons/sun";
import UserIcon from "lucide-solid/icons/user";
import { type ComponentProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Link } from "@/components/navigation/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTheme } from "@/components/theme/use-theme";
import { cn } from "@/lib/utils";

function LoadingFallback() {
  return (
    <div class="size-8 animate-pulse rounded-full bg-muted-foreground/30" />
  );
}

function UnauthorizedFallback() {
  return (
    <div class="flex items-center gap-x-2">
      <Link to="/login" class="px-2">
        <SignInLogo class="size-6" />
      </Link>
      <ThemeToggle />
    </div>
  );
}

export function SignIn() {
  const navigate = useNavigate();

  // const { signOut } = useAuthClient();
  // const signOut = () => {};

  // const handleLogout = async () => {
  //   signOut(undefined, {
  //     onSuccess: () => {
  //       navigate({ to: "/" });
  //     },
  //   });
  // };

  const { theme, setTheme } = useTheme();

  const data = {
    user: {
      name: "",
      email: "",
      image: "",
      role: "admin",
    },
  };

  return (
    <Show when={data.user} fallback={<UnauthorizedFallback />}>
      <DropdownMenu flip placement="bottom-end" overflowPadding={40}>
        <DropdownMenuTrigger
          class="flex flex-row flex-wrap items-center"
          as={(
            _triggerProps: PolymorphicCallbackProps<
              ComponentProps<typeof Avatar>,
              DropdownMenuTriggerOptions,
              DropdownMenuTriggerRenderProps
            >,
          ) => <SignInLogo class="size-6" />}
        />

        <DropdownMenuContent class="min-w-48 max-w-56 tracking-normal">
          <div class="grid gap-0.5 px-2 py-1.5 text-sm">
            <p class="font-medium">
              {data.user.name ? `Hi, ${data.user.name}` : "Hi!"}
            </p>
            <p class="font-normal text-muted-foreground">{data.user.email}</p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem as={Link} to="/" class="w-full justify-start">
            <UserIcon class="mr-2 size-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem as={Link} to="/" class="w-full justify-start">
            <SettingsIcon class="mr-2 size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSub overlap slide>
            <DropdownMenuSubTrigger class="w-full justify-start">
              <Dynamic
                component={theme() === "dark" ? MoonIcon : SunIcon}
                class="mr-2 size-4"
              />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <Show when={data.user.role === "admin"}>
            <div class="-m-1 bg-sidebar/30 *:p-1">
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Admin</DropdownMenuGroupLabel>
                <DropdownMenuItem
                  as={Link}
                  to="/admin"
                  class="w-full justify-start"
                >
                  <MonitorCogIcon class="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
          </Show>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            class="text-destructive"
            onClick={(e) => {
              e.preventDefault();
              // handleLogout();
            }}
          >
            <LogOutIcon class="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Show>
  );
}

function SignInLogo(props: ComponentProps<"span">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      class={cn("size-4 fill-current", props.class)}
    >
      <title>Sign In</title>
      <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM200,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V40A8,8,0,0,0,200,32Z" />
    </svg>
  );
}
