import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { REVENUE_AMOUNT_INFO } from "@/data/revenueData";

export default function RevenueHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between mb-4 max-w-3xl w-full">
      <h1 className="text-2xl font-bold">{t("instructor.revenue.title")}</h1>
      <h2 className="text-xl font-semibold mt-2">
        {t("instructor.revenue.name")}
      </h2>
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
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-2 lg:gap-[10%] my-8">
        {REVENUE_AMOUNT_INFO.map((info) => (
          <div
            key={info.labelKey}
            className="h-[102px]  md:h-fit   flex flex-col items-center justify-center border  md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span
              className={`text-lg font-semibold ${
                info.isIncreased ? "text-green-500" : "text-red-500"
              }`}
            >
              {info.isIncreased ? "+ " : "- "}
              {info.formattedAmount}
            </span>
            <span className="text-sm text-gray-500">{t(info.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
