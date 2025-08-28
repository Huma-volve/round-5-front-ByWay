import CourseCard from "@/components/course/CourseCard/CourseCard";
// import Review from "@/components/instructor/reviews/Review";
import { Button } from "@/components/ui/button";
import RatingsOverview from "@/components/instructor/reviews/RatingsOverview";
import InstructorCard from "@/components/instructor/InstructorCard/InstructorCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/instructor-courses-api";
import Review from "@/components/instructor/reviews/Review";
import NoCourses from "@/components/instructor/empty/NoCourses";
import NoReviews from "@/components/instructor/empty/NoReviews";
export default function Instructor() {
  type Course = {
  id: number;
  title: string;
  description: string;
  status: string;
  name?: string;
  key?: number;
  rate?: number;
  price?:number };

  type review ={
    id: number
    review : string
     rating : number
     created_at: string
      user: { //id: number,
                    name: string,}  };
 const {data ,error , isLoading,isFetching } = useQuery({
    queryKey : ["course"],
    queryFn : async () => {
  const { data } = await axiosInstance.get("/instructor/courses");

  console.log("instructor list courses", data.data);
  console.log("instructor full response", data);

  return data.data;  }
  });
  if (error) {
   console.error("Query error:", error);
 }
console.log("isLoading:", isLoading, "isFetching:", isFetching);

const { t } = useTranslation();

  return (
    <main className="container py-12 space-y-12">
      {/* <section className="space-y-3">
        <InstructorCard />

        <h2 className=" flex justify-between items-center">
          <p className="text-xl lg:text-2xl font-semibold">{t("instructor.yourCourses")}</p>
          <Link to="/instructor/my-courses" className="px-4 py-1 my-2 bg-blue-500 text-white rounded">{t("common.seeAll")}</Link>
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((course: Course) => (
            <CourseCard
              key={course.id}   course={course} id={String(course.id)}
              variant ="instructor" />
   ))}
        </div>
      </section>
 */}

      <section className="space-y-3">
  <InstructorCard />

  <h2 className="flex justify-between items-center">
    <p className="text-xl lg:text-2xl font-semibold">{t("instructor.yourCourses")}</p>
    <Link to="/instructor/my-courses" className="px-4 py-1 my-2 bg-blue-500 text-white rounded">
      {t("common.seeAll")}
    </Link>
  </h2>

  {data && data.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((course: Course) => (
        <CourseCard
          key={course.id}
          course={course}
          id={String(course.id)}
          variant="instructor"
        />
      ))}
    </div>
  ) : (
    <NoCourses/>  )}
</section>


  {data?.reviews && data.reviews.length > 0 ? (
    data.reviews.map((review: review) => (
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
           
     <Review key={review.id} variant="user" review={review} />
             {/* {data?.reviews?.map(( review: review ) => (
          ))} */}
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
      
   
      // 
    )) ) : (
    <NoReviews />)}

 
       </main> );}
