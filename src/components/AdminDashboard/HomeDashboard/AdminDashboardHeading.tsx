import DASHBOARD_HEADING_DATA from "@/data/dashboardHomeData";
import type { DashboardHeadingData } from "@/data/dashboardHomeData";
import { useTranslation } from "react-i18next";

export default function AdminDashboardHeading() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="flex gap-2 mb-2">
        <p className="text-xl md:text-2xl lg:text-3xl text-primary font-bold">
          {t("admin.home.welcomeBack")}
        </p>
      </h1>
      <p className="text-gray-500 text-sm">
        {t("admin.home.platformOverview")}
      </p>
      <div className="mx-auto flex flex-wrap w-full items-center justify-center gap-4 my-8">
        {DASHBOARD_HEADING_DATA.map((item: DashboardHeadingData) => (
          <div
            key={item.labelKey}
            className="flex-1 min-w-[200px] h-[102px] md:h-fit flex flex-col items-center justify-center border md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className={`text-lg font-semibold text-revenue1Graph`}>
              {item.amount}
            </span>
            <span className="text-sm text-gray-500">{t(item.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
