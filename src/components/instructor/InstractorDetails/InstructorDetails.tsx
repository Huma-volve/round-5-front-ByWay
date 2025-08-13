import CardCourse from "@/components/courses/CardCourse";
import { CircleUser } from "lucide-react";
import React from "react";
function InstructorDetails() {
  return (
    <div className="md:mx-24 mx-5 mt-12">
      <div className="flex mb-14">
        <p className="text-sm md:text-lg">Browse Courses</p>
        <p className="mx-4 font-[600] text-sm md:text-lg">{">"}</p>
        <p className="text-[--rate] text-sm md:text-lg">details Courses</p>
      </div>
      <div>
        <div className="flex items-center flex-wrap md:justify-start justify-center gap-2">
          <CircleUser size={100} />
          <h3 className="font-[500]">
            {" "}
            Omnya Ali - 2.5Million <br /> +Enrollments Worldwide
          </h3>
        </div>
        <div>
          <div className="my-10 flex items-center flex-wrap md:justify-start justify-center gap-10 md:gap-40">
            <div className="text-center">
              <p className="font-[600] text-xl mb-1">1000+</p>
              <p>number of students</p>
            </div>
            <div className="text-center">
              <p className="font-[600] text-xl mb-1">15+</p>
              <p>number of reviews</p>
            </div>
          </div>
          <div>
            <p className="font-[600] text-xl">About me</p>
            <p className="my-5">
              I'm a certified UI/UX designer with 5+ years of experience in
              teaching and designing user-centric products. I’ve helped over
              1,000 students kickstart their design careers through hands-on,
              practical courses.
            </p>
          </div>
        </div>
      </div>
      <p className="text-lg font-[600]">My courses</p>
      <div className="grid mx-10 my-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-center">
        <CardCourse />
      </div>
    </div>
  );
}

export default InstructorDetails;
