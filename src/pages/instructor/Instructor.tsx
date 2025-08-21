import CourseCard from "@/components/course/CourseCard/CourseCard";
import Course_Card_Data from "../../data/CourseCardData";
import type { Course_Card_Data as CourseCardType } from "../../data/CourseCardData";
import Review from "@/components/instructor/reviews/Review";
import { Button } from "@/components/ui/button";
import RatingsOverview from "@/components/instructor/reviews/RatingsOverview";
import InstructorCard from "@/components/instructor/InstructorCard/InstructorCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function Instructor() {
  const { t } = useTranslation();
  return (
    <main className="container py-12 space-y-12">
      <section className="space-y-3">
        <InstructorCard />

        <h2 className=" flex justify-between items-center">
          <p className="text-xl lg:text-2xl font-semibold">{t("instructor.yourCourses")}</p>
          <Link to="/instructor/my-courses" className="px-4 py-1 my-2 bg-blue-500 text-white rounded">{t("common.seeAll")}</Link>
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Course_Card_Data.map((course: CourseCardType) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              title={course.title}
              rate={course.rate}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 px-4 sm:px-6">
        <h2 className="text-xl lg:text-2xl font-semibold">
          {t("profile.Learner Reviews")}
        </h2>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <RatingsOverview />
          </div>

          <div className="md:col-span-2 ">
            <div className="mb-9 space-y-4">
              <Review
                variant="user"
                name="Mohamed"
                review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down"
                rating={5}
                date="Aug 2025"
              />
              <Review
                variant="user"
                name="Mohamed"
                review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down"
                rating={3}
                date="Aug 2025"
              />
              <Review
                variant="user"
                name="Mohamed"
                review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down"
                rating={2}
                date="Aug 2025"
              />
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
    </main>
  );
}
