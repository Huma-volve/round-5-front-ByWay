import CourseCard from "@/components/course/CourseCard/CourseCard";
// import { Pagination } from "@/components/ui/pagination";
import Course_Card_Data from "../../../data/CourseCardData";
import type { Course_Card_Data as CourseCardType } from "../../../data/CourseCardData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyCourses() {
  const { t } = useTranslation();
  return (
    <>
      <section className="container py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-xl lg:text-2xl mb-4">
            {t("instructor.Courses")} (12)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Course_Card_Data.map((course: CourseCardType) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              title={course.title}
              rate={course.rate}
              variant="myCourses"
            />
          ))}
        </div>
      </section>

      <section className="pb-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  );
}
