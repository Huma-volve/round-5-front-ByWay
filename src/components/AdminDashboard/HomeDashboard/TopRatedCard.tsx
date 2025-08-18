import type { DashboardTopRatedCourses } from "@/data/dashboardHomeData";
import { Star } from "lucide-react";

export default function TopRatedCard({
  course,
}: {
  course: DashboardTopRatedCourses;
}) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-sm text-gray-700">Instructor: {course.instructor}</p>
      <p className="text-sm text-gray-700 flex items-center gap-1">
        <Star className="inline-block size-5 text-yellow-500" /> <span>{course.rating}</span>
        <span className=""> ({course.students} students)</span>
      </p>
    </div>
  );
}
