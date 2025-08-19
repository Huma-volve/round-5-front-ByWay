import TopRatedCard from "./TopRatedCard";
import { useTopRatedCourses } from "@/hooks/useTopRatedCourses";
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
              className="h-48 bg-gray-200 animate-pulse rounded-lg"
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
