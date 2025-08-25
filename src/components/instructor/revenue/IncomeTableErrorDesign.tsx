import { useTranslation } from "react-i18next";

interface IncomeTableErrorDesignProps {
  isAdmin?: boolean;
  error?: Error | null;
}

export default function IncomeTableErrorDesign({
  isAdmin = false,
  error,
}: IncomeTableErrorDesignProps) {
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

      {/* Error container */}
      <div className="w-full mt-8 p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center mx-4">
        <div className="text-red-500 text-lg font-medium mb-4">
          {t("instructor.income.errorLoadingData")}
        </div>
        <p className="text-gray-600 mb-6">
          {error?.message || t("instructor.income.errorLoadingData")}
        </p>
      </div>
    </div>
  );
}
