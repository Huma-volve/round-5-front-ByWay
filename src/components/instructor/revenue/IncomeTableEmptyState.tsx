import { useTranslation } from "react-i18next";
import { FileText, CreditCard } from "lucide-react";

interface IncomeTableEmptyStateProps {
  isAdmin?: boolean;
}

export default function IncomeTableEmptyState({
  isAdmin = false,
}: IncomeTableEmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-4 mt-16 mb-8 flex flex-col gap-2">
      {/* Title */}
      <h1
        className={`text-xl md:text-2xl font-bold mb-2 ps-4 ${
          isAdmin && "text-primary ps-0"
        }`}
      >
        {isAdmin
          ? t("admin.home.recentPayoutRequests")
          : t("instructor.income.title")}
      </h1>

      {/* Search and filter section (only for non-admin) */}
      {!isAdmin && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-4">
          <div className="relative w-full sm:max-w-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              disabled
              placeholder={t("instructor.income.search.placeholder")}
              className="w-full px-3 py-2 pr-10 text-sm border-0 bg-gray-50 text-gray-400 rounded-md"
            />
          </div>
          <div className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-400 text-sm">
            {t("instructor.income.filters.paymentPlaceholder")}
          </div>
        </div>
      )}

      {/* Empty state container */}
      <div className="rounded-lg mx-4 overflow-x-auto border border-gray-200 shadow-sm bg-white">
        <div className="min-w-[600px]">
          {/* Table header */}
          <div className="bg-gray-50 border-b">
            <div className="flex">
              <div className="flex-1 px-4 py-3 text-center font-semibold text-gray-700">
                {t("instructor.income.table.customer")}
              </div>
              <div className="flex-1 px-4 py-3 text-center font-semibold text-gray-700">
                {t("instructor.income.table.date")}
              </div>
              <div className="flex-1 px-4 py-3 text-center font-semibold text-gray-700">
                {t("instructor.income.table.paymentType")}
              </div>
              <div className="flex-1 px-4 py-3 text-center font-semibold text-gray-700">
                {t("instructor.income.table.amount")}
              </div>
            </div>
          </div>

          {/* Empty state content */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-6">
              <CreditCard className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isAdmin
                ? t("instructor.income.empty.adminTitle")
                : t("instructor.income.empty.title")}
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              {isAdmin
                ? t("instructor.income.empty.adminDescription")
                : t("instructor.income.empty.description")}
            </p>
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="block sm:hidden p-2 text-center text-sm text-gray-500 border-t">
          {t("instructor.income.table.scrollHint")}
        </div>
      </div>
    </div>
  );
}
