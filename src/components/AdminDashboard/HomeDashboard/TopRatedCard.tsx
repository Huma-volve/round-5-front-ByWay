import type { TopRatedCourse } from "@/lib/types";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TopRatedCard({ course }: { course: TopRatedCourse }) {
  const { t } = useTranslation();

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-sm text-gray-700">
        {t("admin.home.instructor")} {course.instructor_name || "N/A"}
      </p>
      <p className="text-sm text-gray-700 flex items-center gap-1">
        <Star className="inline-block size-5 text-yellow-500" />
        <span>{course.average_rating.toFixed(1)}</span>
        <span className="">
          ({course.reviews_count} {t("admin.home.reviews")})
        </span>
      </p>
    </div>
  );
}
