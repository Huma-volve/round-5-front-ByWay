"use client";

import {
  BadgeDollarSign,
  Book,
  ChartNoAxesCombined,
  Gauge,
  Settings,
  Star,
  User,
  UserPlus,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import AddAdmin from "@/pages/AdminDashboard/login/AddAdmin";

export function NavMain() {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      exact: true, // Only match exact path
      icon: Gauge,
    },
    {
      title: "User Management",
      url: "/admin/user-manage",
      exact: false, // Match sub-routes like /admin/user-manage/123
      icon: User,
    },
    {
      title: "Course Management",
      url: "/admin/course-manage",
      exact: false,
      icon: Book,
    },
    {
      title: "Payment & revenue",
      url: "/admin/payment-revenue",
      exact: false,
      icon: BadgeDollarSign,
    },
    {
      title: "Reviews & Ratings",
      url: "/admin/reviews-ratings",
      exact: false,
      icon: Star,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      exact: false,
      icon: Settings,
    },
    {
      title: "Reports & Analytics",
      url: "/admin/analytics",
      exact: false,
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarGroupContent className="">
          <SidebarMenu className="*:py-2">
            {items.map((item) => {
              // Improved active state logic
              const isActive = item.exact
                ? location.pathname === item.url // Exact match for dashboard
                : location.pathname === item.url ||
                location.pathname.startsWith(item.url + "/"); // Match sub-routes for others

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
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
              );
            })}
          </SidebarMenu>
          <SidebarMenuButton asChild>
            <button
              onClick={() => setOpenDialog(true)} 
              className="flex items-center justify-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 bg-primary mt-4 !w-40 hover:bg-secondaryDark hover:text-primary"
            >
              <UserPlus className="!w-4 !h-4 shrink-0" />
              <span className="text-sm font-medium truncate">Add Admin</span>
            </button>
          </SidebarMenuButton>

        </SidebarGroupContent>

      </SidebarGroup>
      <AddAdmin open={openDialog} onOpenChange={setOpenDialog} />
    </>

  );
}
