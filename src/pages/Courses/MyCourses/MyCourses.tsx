import CourseCard from "@/components/course/CourseCard/CourseCard";
// import { Pagination } from "@/components/ui/pagination";
import Course_Card_Data from '../../../data/CourseCardData'
import type { Course_Card_Data as CourseCardType } from '../../../data/CourseCardData'
import {
  Pagination,
  PaginationContent,
 
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
export default function MyCourses() {
  return (
    <>
      <section className="container py-12">
        <div className="flex justify-between items-center">
        <h1 className="text-bold text-xl lg:text-2xl mb-4">Courses (12)</h1>
<div className="flex gap-3 mb-3 ">
  <span>Sort By</span>
  <span className=" ">Relevance</span>
  
  <span className="">Filter</span>
  <span className="">Add course</span>
</div>

</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

{
  Course_Card_Data.map((course: CourseCardType)=>(<CourseCard  
     key={course.id}
     id={course.id}
    name={course.name}
    title={course.title}
    rate={course.rate}
    variant="myCourses"/>))
}
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
  )
}
