 import CourseCard from "@/components/course/CourseCard/CourseCard";
// import { Button } from "@/components/ui/button";
// import RatingsOverview from "@/components/instructor/reviews/RatingsOverview";
import InstructorCard from "@/components/instructor/InstructorCard/InstructorCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import NoCourses from "@/components/instructor/empty/NoCourses";
// import NoReviews from "@/components/instructor/empty/NoReviews";
import { useInstructor } from "@/api/useInstructor";
import LoadingCourses from "@/components/course/CourseCard/LoadingCourses";
import ErrorState from "@/components/course/CourseCard/ErrorState";
// import Review from "@/components/learnerCourses/ReviewLeanerCourses";


export default function Instructor() {
    type Course = {
  id: number;
  title: string;
  description: string;
  status: string;
  key?: number;
  rate?: number;
  price?:number 
   image_url? :string};
  const { t } = useTranslation();
  const { data, isLoading,error } = useInstructor();


   if (isLoading) return <LoadingCourses />;
   if (error) return <ErrorState/>;

  return (
    <main className="container py-12 space-y-12">
      <section className="space-y-3">
        <InstructorCard />

        <h2 className="flex justify-between items-center">
          <p className="text-xl lg:text-2xl font-semibold">
            {t("instructor.yourCourses")}
          </p>
          <Link
            to="/instructor/my-courses"
            className="px-4 py-1 my-2 bg-blue-500 text-white rounded"
          >
            {t("common.seeAll")}
          </Link>
        </h2>

        {data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.data.map((course: Course) => (
              <CourseCard
                key={course.id} 
                course={course}
                id={String(course.id)}
                variant="instructor"
              />
            ))}
          </div>
        ) : (
          <NoCourses />
        )}
</section>
      {/* {data?.reviews && data.reviews.length > 0 ? (
        <section className="space-y-3 px-4 sm:px-6">
          <h2 className="text-xl lg:text-2xl font-semibold">
            {t("profile.Learner Reviews")}
          </h2>

          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <RatingsOverview />
            </div>
            <div className="md:col-span-2">
              <div className="mb-9 space-y-4">
                {data.reviews.map((review: any) => (
                  <Review key={review.id} variant="user" review={review} />
                ))}
              </div>
              <div className="flex justify-center">
                <Link to="/instructor/reviews">
                  <Button className="bg-white text-black hover:bg-revenue2Bg transition duration-300">
                    {t("profile.View more Reviews")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NoReviews />
      )} */}
    </main>
  );
}
