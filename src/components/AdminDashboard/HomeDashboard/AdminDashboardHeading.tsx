import { Hand } from "lucide-react";
import DASHBOARD_HEADING_DATA from "@/data/dashboardHomeData";
import type { DashboardHeadingData } from "@/data/dashboardHomeData";
export default function AdminDashboardHeading() {
  return (
    <div>
      <h1 className="flex gap-2 mb-2">
        <p className="text-xl md:text-2xl font-bold">Welcome back, Admin</p>
      </h1>
      <p className="text-gray-500 text-sm">
        Here’s a quick overview of your platform performance.
      </p>
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-2 lg:gap-[10%] my-8">
        {DASHBOARD_HEADING_DATA.map((item: DashboardHeadingData) => (
          <div
            key={item.labelKey}
            className="h-[102px]  md:h-fit   flex flex-col items-center justify-center border  md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className={`text-lg font-semibold text-green-500`}>
              {item.amount}
            </span>
            <span className="text-sm text-gray-500">{item.labelKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
