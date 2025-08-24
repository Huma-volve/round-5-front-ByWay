import CategoriesCourses from "../../components/learnerCourses/CategoriesCourses";
import StatsCourses from "@/components/learnerCourses/StatsCourses";
import CardCourse from "@/components/learnerCourses/CardCourse";
import useFetchCourses from "@/hooks/LearnerCourses/useFetchCourses";

function CoursesPage() {
  const { data: courses, error, isLoading } = useFetchCourses();

  return (
    <>
      <CategoriesCourses />
      <StatsCourses />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        <CardCourse courses={courses!} error={!!error} isLoading={isLoading} />
      </div>
    </>
  );
}

export default CoursesPage;
