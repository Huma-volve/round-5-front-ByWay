"use client";

import { BadgeDollarSign, Book, ChartNoAxesCombined, Gauge, Settings, Star, User } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {NavLink } from "react-router-dom";

export function NavMain() {
  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Gauge,
    },
    {
      title: "User Management",
      url: "/user-manage",
      icon: User,
    },
    {
      title: "Course Management",
      url: "#",
      icon: Book,
    },
    {
      title: "Payment & revenue",
      url: "#",
      icon: BadgeDollarSign,
    },
    {
      title: "Reviews & Ratings",
      url: "#",
      icon: Star,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarGroupContent className="">
        <SidebarMenu className="*:py-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className=""
              >
                <NavLink
                  to={item.url}
                  className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                >
                  <item.icon className="!w-6 !h-6 shrink-0" />
                  <span className="text-sm font-medium truncate">
                    {item.title}
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
