import React from "react";
import CategoriesCourses from "../../components/courses/CategoriesCourses";
import StatsCourses from "@/components/courses/StatsCourses";
import CardCourse from "@/components/courses/CardCourse";

function CoursesPage() {
  return (
    <>
      <CategoriesCourses />
      <StatsCourses />
      <div className="grid mx-10 mb-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        <CardCourse />
      </div>
    </>
  );
}

export default CoursesPage;
