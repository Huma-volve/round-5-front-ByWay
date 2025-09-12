import CourseCard from "@/components/course/CourseCard/CourseCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NoCourses from "@/components/instructor/empty/NoCourses";
import useFetchCourses from "@/hooks/instructor/useFetchCourses";
import { useEffect, useState } from "react";
import LoadingCourses from "@/components/course/CourseCard/LoadingCourses";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import type { AxiosError } from "axios";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PaginationBar from "@/components/common/PaginationBar";

export default function MyCourses() {
  const [page, setPage] = useState(1);
  const [localPage, setLocalPage] = useLocalStorage<number>("localPage", 1);

  useEffect(() => {
    setPage(localPage);
  }, [localPage]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalPage(newPage);
  };
  type Course = {
    id: number;
    title: string;
    description: string;
    status: string;
    name?: string;
    key?: number;
    rate?: number;
    price?: number;
  };

  const { data, error, isLoading, isError , refetch} = useFetchCourses(page);

  const { t } = useTranslation();

  const courses = data?.data?.data.data || [];
  const axiosError = error as AxiosError<{ message?: string }>;
  const meta = data?.data?.data.meta;
  const totalPages = meta?.last_page;
  const currentPage = meta?.current_page;
  const totalCourses = meta?.total;
  const coursesPerThisPage = meta?.to - meta?.from + 1;

  let content = (
    <div className="container  pt-12  flex justify-center items-center">
      <NoCourses />
    </div>
  );
  if (isLoading) {
    content = <LoadingCourses />;
  }
  if (isError) {
    content = <ErrorState message={axiosError?.response?.data?.message} onRetry={refetch}/>;
  }
  if (courses.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses?.map((course: Course) => (
          <CourseCard
            id={String(course.id)}
            key={course.id}
            course={course}
            variant="instructor"
          />
        ))}
      </div>
    );
  }

  console.log(courses, meta);
  return (
    <>
      <section className="container py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-xl lg:text-2xl mb-4">
            {t("instructor.Courses")} ({coursesPerThisPage || 0} {t("common.of")} {totalCourses || 0})
          </h1>

          <div className="flex items-center gap-4 mb-4 p-3 rounded-md shadow-sm">
            <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="" disabled selected hidden>
                {t("instructor.SortBy")}
              </option>
              <option>{t("instructor.Relevance")}</option>
              <option>{t("common.rate")}</option>
            </select>

            <Button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-rate transition-colors">
              {t("instructor.Filter")}
            </Button>

            <Link
              to="/instructor/add-course"
              className="bg-success text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
            >
              {t("instructor.AddCourse")}
            </Link>
          </div>
        </div>
        {content}
      </section>

      {courses.length > 0 && (
        <section className="pb-12">
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </section>
      )}
    </>
  );
}
