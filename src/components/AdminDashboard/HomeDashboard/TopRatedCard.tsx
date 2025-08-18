import type { DashboardTopRatedCourses } from "@/data/dashboardHomeData";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TopRatedCard({
  course,
}: {
  course: DashboardTopRatedCourses;
}) {
  const { t } = useTranslation();

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-sm text-gray-700">
        {t("admin.home.instructor")} {course.instructor}
      </p>
      <p className="text-sm text-gray-700 flex items-center gap-1">
        <Star className="inline-block size-5 text-yellow-500" />
        <span>{course.rating}</span>
        <span className="">
          {" "}
          ({course.students} {t("admin.home.students")})
        </span>
      </p>
    </div>
  );
}
