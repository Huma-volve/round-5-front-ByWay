import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useFetchInstructorRevenueAnalytics from "@/hooks/useFetchInstructorRevenueAnalytics";
import { currencyFormatter } from "@/utils/CurrencyFormatter";

function checkIncrease(amount: number) {
  if (!amount) return "text-gray-500";
  return amount > 0 ? "text-green-500" : "text-red-500";
}

export default function RevenueHeader() {
  const { t } = useTranslation();
  const { data, isPending, isError, error } =
    useFetchInstructorRevenueAnalytics();
  const analytics = data?.data || {};
  let content;
  if (isPending) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-2 lg:gap-[10%] my-8">
        {/* Loading skeleton */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-20 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse rounded-lg"
          ></div>
        ))}
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

  if (analytics && Object.keys(analytics).length > 0) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-2 lg:gap-[10%] my-8">
        <div className="h-[102px]  md:h-fit   flex flex-col items-center justify-center border  md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span
            className={`text-lg font-semibold ${checkIncrease(
              analytics.total_profits
            )}`}
          >
            {currencyFormatter.format(analytics.total_profits)}
          </span>
          <span className="text-sm text-gray-500">
            {t("instructor.revenue.stats.totalProfits")}
          </span>
        </div>
        <div className="h-[102px]  md:h-fit   flex flex-col items-center justify-center border  md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span
            className={`text-lg font-semibold ${checkIncrease(
              analytics.available_balance
            )}`}
          >
            {currencyFormatter.format(analytics.available_balance)}
          </span>
          <span className="text-sm text-gray-500">
            {t("instructor.revenue.stats.availableBalance")}
          </span>
        </div>
        <div className="h-[102px]  md:h-fit   flex flex-col items-center justify-center border  md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <span
            className={`text-lg font-semibold ${checkIncrease(
              analytics.last_transaction
            )}`}
          >
            {currencyFormatter.format(analytics.last_transaction)}
          </span>
          <span className="text-sm text-gray-500">
            {t("instructor.revenue.stats.lastTransaction")}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between mb-4 max-w-3xl w-full">
      <h1 className="text-2xl font-bold">{t("instructor.revenue.title")}</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-placeholder">
          {t("instructor.revenue.paidMessage")}
        </p>
        <Link
          to="/instructor/get-paid"
          className=" py-3 px-6 bg-[var(--primary)] text-white rounded-lg hover:bg-opacity-90 transition-colors duration-200"
        >
          {t("instructor.revenue.getPaid")}
        </Link>
      </div>
      {content}
    </div>
  );
}
