import CategoriesCourses from "../../components/learnerCourses/CategoriesCourses";
import StatsCourses from "@/components/learnerCourses/StatsCourses";
import CardCourse from "@/components/learnerCourses/CardCourse";
import useFetchCourses from "@/hooks/LearnerCourses/useFetchCourses";
import PaginationBar from "@/components/common/PaginationBar";
import { useState } from "react";

function CoursesPage() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchCourses(page);
  const courses = data?.courses;
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <CategoriesCourses />
      <StatsCourses />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        <CardCourse courses={courses!} error={!!error} isLoading={isLoading} />
      </div>
      {courses && (
        <section className="flex justify-center">
          <PaginationBar
            currentPage={pagination?.current_page}
            totalPages={pagination?.last_page}
            handlePageChange={handlePageChange}
          />
          {console.log(pagination)}
        </section>
      )}
    </>
  );
}

export default CoursesPage;
