import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardLayout() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const sidebarSide = isRTL ? "right" : "left";

  return (
    <SidebarProvider>
      <AppSidebar side={sidebarSide} />
      <main className="w-full px-8">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
