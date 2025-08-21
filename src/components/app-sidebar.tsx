import * as React from "react";
// import {
//   Eye,
//   UserRoundCog,
//   UserStar,
// } from "lucide-react"

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  /*,SidebarRail,*/
} from "@/components/ui/sidebar";
import SidebarAppHeader from "./common/SidebarAppHeader";

// This is sample data Team switch
// const data = {
//   teams: [
//     {
//       name: "Administrator",
//       logo: UserStar ,
//       plan: "All access",
//     },
//     {
//       name: "Editor.",
//       logo: UserRoundCog ,
//       plan: "Partial Access",
//     },
//     {
//       name: "Viewer.",
//       logo: Eye ,
//       plan: "No Access",
//     },
//   ],
// }

export function AppSidebar({
  side = "left",
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" side={side} {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarAppHeader variant="dark" />
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
