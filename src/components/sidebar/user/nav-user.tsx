"use client";

import { Bell, ChevronRight, LogOut, LucideLoader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggleInDropdown } from "@/components/mode-toggle";
import { useLogout } from "@/features/auth/api/use-logout";
import { useGetUserById } from "@/features/users/api/use-get-users";
import { User } from "@prisma/client";

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const { mutate: logout, isPending: isPendingLogout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const userToDisplay = useGetUserById(user.id);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg bg-foreground">
                <AvatarImage
                  src={userToDisplay.data?.avatarUrl}
                  alt={userToDisplay.data?.name}
                />
                <AvatarFallback className="rounded-none">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {userToDisplay.data?.name}
                </span>
                <span className="truncate text-xs">
                  {userToDisplay.data?.email}
                </span>
              </div>
              <ChevronRight className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg bg-foreground">
                  <AvatarImage
                    src={userToDisplay.data?.avatarUrl}
                    alt={userToDisplay.data?.name}
                  />
                  <AvatarFallback className="rounded-none">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-black">
                    {userToDisplay.data?.name}
                  </span>
                  <span className="truncate text-xs">
                    {userToDisplay.data?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ModeToggleInDropdown />
            <DropdownMenuSeparator />
            <div
              onClick={handleLogout}
              className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-foreground/5">
              {isPendingLogout ? (
                <>
                  <LucideLoader className="size-4 animate-spin" />
                  Déconnexion...
                </>
              ) : (
                <>
                  <LogOut className="size-4" />
                  Log out
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
