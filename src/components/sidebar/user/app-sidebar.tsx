"use client";

import * as React from "react";
import { LayoutDashboardIcon, MedalIcon } from "lucide-react";

import { NavUser } from "@/components/sidebar/user/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import { NavMain } from "./nav-main";
import Image from "next/image";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const data = [
    {
      name: "Votes",
      url: "/votes",
      icon: MedalIcon,
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Image src="/logo-mdr.svg" alt="Logo" width={100} height={100} className="invert" />
      </SidebarHeader>
      <SidebarSeparator className="border-b" />
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarSeparator className="border-b" />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
