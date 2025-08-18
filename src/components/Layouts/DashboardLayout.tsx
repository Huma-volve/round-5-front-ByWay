import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className="w-full px-8">
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}
