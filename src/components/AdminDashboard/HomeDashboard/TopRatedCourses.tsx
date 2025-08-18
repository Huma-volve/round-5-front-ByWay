import TopRatedCard from "./TopRatedCard";
import { TOP_RATED_COURSES } from "@/data/dashboardHomeData";
import type { DashboardTopRatedCourses } from "@/data/dashboardHomeData";
import { useTranslation } from "react-i18next";

export default function TopRatedCourses() {
  const { t } = useTranslation();

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold text-primary">
        {t("admin.home.topRatedCourses")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {TOP_RATED_COURSES.map((course: DashboardTopRatedCourses) => (
          <TopRatedCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
