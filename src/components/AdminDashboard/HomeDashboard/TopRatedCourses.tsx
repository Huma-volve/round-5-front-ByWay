import TopRatedCard from "./TopRatedCard";
import { TOP_RATED_COURSES } from "@/data/dashboardHomeData";
import type { DashboardTopRatedCourses } from "@/data/dashboardHomeData";

export default function TopRatedCourses() {
  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold text-primary">Top Rated Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {TOP_RATED_COURSES.map((course: DashboardTopRatedCourses) => (
          <TopRatedCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
