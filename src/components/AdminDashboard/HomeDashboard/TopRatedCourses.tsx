import TopRatedCard from "./TopRatedCard";
import { useTopRatedCourses } from "@/hooks/AdminDashboard/useTopRatedCourses";
import { useTranslation } from "react-i18next";

export default function TopRatedCourses() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useTopRatedCourses();

  if (isLoading) {
    return (
      <div className="mt-12">
        <h1 className="text-xl font-bold text-primary">
          {t("admin.home.topRatedCourses")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {/* Loading skeleton */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-12">
        <h1 className="text-xl font-bold text-primary">
          {t("admin.home.topRatedCourses")}
        </h1>
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            {error?.message || "Failed to load top-rated courses"}
          </p>
        </div>
      </div>
    );
  }

  const courses = data?.data || [];

  // Empty state - when API returns successfully but with no courses
  if (courses.length === 0 && !isLoading && !isError) {
    return (
      <div className="mt-12">
        <h1 className="text-xl font-bold text-primary">
          {t("admin.home.topRatedCourses")}
        </h1>
        <div className="mt-6 p-8 bg-white border border-gray-200 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("admin.home.empty.topRatedTitle")}
            </h3>
            <p className="text-gray-500 max-w-md">
              {t("admin.home.empty.topRatedDescription")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold text-primary">
        {t("admin.home.topRatedCourses")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {courses.map((course) => (
          <TopRatedCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
