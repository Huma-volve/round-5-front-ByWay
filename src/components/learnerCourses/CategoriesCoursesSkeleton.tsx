import { useTranslation } from "react-i18next";

export default function CategoriesCoursesSkeleton() {
  const { t } = useTranslation();

  return (
    <div className="mx-10 mt-12">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-semibold">{t("common.topCategories")}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center border border-[--category] bg-white p-4 rounded-lg shadow w-full animate-pulse"
          >
            {/* Circle for icon */}
            <div className="border rounded-full p-7 bg-[--category] flex items-center justify-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
            </div>

            {/* Title */}
            <div className="h-4 w-24 bg-gray-300 rounded my-2"></div>

            {/* Subtitle */}
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
