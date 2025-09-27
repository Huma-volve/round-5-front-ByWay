import CategoriesCourses from "../../components/learnerCourses/CategoriesCourses";
import StatsCourses from "@/components/learnerCourses/StatsCourses";
import CardCourse from "@/components/learnerCourses/CardCourse";
import useFetchCourses from "@/hooks/LearnerCourses/useFetchCourses";
import PaginationBar from "@/components/common/PaginationBar";
import { useState } from "react";
import CategoriesCoursesSkeleton from "@/components/learnerCourses/CategoriesCoursesSkeleton";
import StatsCoursesSkeleton from "@/components/learnerCourses/StatsCoursesSkeleton";
import type { AxiosError } from "axios";

function CoursesPage() {
  const [page, setPage] = useState(1);
  const { data, error,isError, isLoading } = useFetchCourses(page);
  const courses = data?.data?.courses;
  const pagination = data?.data?.pagination;
  const axiosError = error as AxiosError<{ message?: string }>;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {isLoading ? <CategoriesCoursesSkeleton /> : <CategoriesCourses />}
      {isLoading ? <StatsCoursesSkeleton /> : <StatsCourses />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        <CardCourse courses={courses!} error={axiosError} isError={isError} isLoading={isLoading} />
      </div>
      {courses && (
        <section className="flex justify-center">
          <PaginationBar
            currentPage={pagination?.current_page}
            totalPages={pagination?.last_page}
            handlePageChange={handlePageChange}
          />
        </section>
      )}
    </>
  );
}

export default CoursesPage;
