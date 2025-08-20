import { useFetchDashboardStatistics } from "@/hooks/AdminDashboard/useFetchDashboardStatistics";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { useTranslation } from "react-i18next";

export default function AdminDashboardHeading() {
  const { t } = useTranslation();
  const { data, isPending, isError, error } = useFetchDashboardStatistics();
  const statistics = data?.data || [];
  let content;
  if (isPending) {
    content = (
      <div className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {/* Loading skeleton */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }
  if (isError) {
    content = (
      <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">
          {error?.message || "Failed to load statistics."}
        </p>
      </div>
    );
  }
  if (statistics.length !== 0) {
    content = (
      <div className="mx-auto flex flex-wrap w-full items-center justify-center gap-4 my-8">
        <div className="flex-1 min-w-[200px] h-[102px] md:h-fit flex flex-col items-center justify-center border md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span className={`text-lg font-semibold text-revenue1Graph`}>
            {statistics["active_learners"]}
          </span>
          <span className="text-sm text-gray-500">
            {t("admin.home.active_learners")}
          </span>
        </div>
        <div className="flex-1 min-w-[200px] h-[102px] md:h-fit flex flex-col items-center justify-center border md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span className={`text-lg font-semibold text-revenue1Graph`}>
            {statistics["active_instructors"]}
          </span>
          <span className="text-sm text-gray-500">
            {t("admin.home.active_instructors")}
          </span>
        </div>
        <div className="flex-1 min-w-[200px] h-[102px] md:h-fit flex flex-col items-center justify-center border md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span className={`text-lg font-semibold text-revenue1Graph`}>
            {statistics["published_courses"]}
          </span>
          <span className="text-sm text-gray-500">
            {t("admin.home.published_courses")}
          </span>
        </div>
        <div className="flex-1 min-w-[200px] h-[102px] md:h-fit flex flex-col items-center justify-center border md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span className={`text-lg font-semibold text-revenue1Graph`}>
            {currencyFormatter.format(statistics["Total Revenue"])}
          </span>
          <span className="text-sm text-gray-500">
            {t("admin.home.Total Revenue")}
          </span>
        </div>
      </div>
    );
  }
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
      {content}
    </div>
  );
}
