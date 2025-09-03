import CourseCard from "@/components/course/CourseCard/CourseCard";
// import { Pagination } from "@/components/ui/pagination";
// import {
//   Pagination,PaginationContent,PaginationItem,PaginationLink,
//   PaginationNext,PaginationPrevious,} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
import NoCourses from "@/components/instructor/empty/NoCourses";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function MyCourses() {
type Course = {
  id: number;

  title: string;
  description: string;
  status: string;
  name?: string;
    key?: number;
    rate?: number;
    price?:number };
    console.log("renderrrrrr")
       const [token] = useLocalStorage("auth_token", '');
      console.log("TOKEN:", token)

console.log("renderrrrrr MyCourses mounted");
console.log("TOKEN:", token);


const { data, error, isLoading, isFetching } = useQuery({
  queryKey: ["course"],
  queryFn: async () => {
    console.log("Running queryFn...");
    const { data } = await axios.get(
      "https://round5-byway.huma-volve.com/api/instructor/course-management/courses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("list courses", data.data);
    console.log("full response", data);

    return data;
  },
});
 if (error) {
   console.error("Query error:", error);
 }
console.log("isLoading:", isLoading, "isFetching:", isFetching);

  const { t } = useTranslation();

  const courses = data?.data?.data || [];
  return (
    <>
     {courses.length > 0 ? (
          <>

      <section className="container py-12">
        <div className="flex justify-between items-center">
          <h1 className="text-bold text-xl lg:text-2xl mb-4">
            {t("instructor.Courses")} ({courses.length})
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
          {courses?.map((course: Course) => (
            <CourseCard
              id={String(course.id)}
              key={course.id }
               course={course}
               variant ="instructor"
              
            />
          ))}
        </div>
      </section>

      {/* <section className="pb-12">
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
      </section> */}
    </>
  

      ) : (
        <div className="container  pt-12  flex justify-center items-center">
           <NoCourses />
           
        </div>
          )}
 </>
);
}
