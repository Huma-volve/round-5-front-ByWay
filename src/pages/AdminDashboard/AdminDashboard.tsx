import AdminDashboardHeading from "@/components/AdminDashboard/HomeDashboard/AdminDashboardHeading";
import TopRatedCourses from "@/components/AdminDashboard/HomeDashboard/TopRatedCourses";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";
import RevenueChart from "@/components/instructor/revenue/RevenueChart";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
    const { t } = useTranslation(); 
  return (
    <div className="">
          <AdminDashboardHeading />
          <h1 className="text-xl md:text-2xl font-bold my-10 text-primary">{t("admin.home.MonthlyRevenueOverview")}</h1>
          <RevenueChart />
          <TopRatedCourses />
          <IncomeTable isAdmin={true} />
    </div>
  )
}
