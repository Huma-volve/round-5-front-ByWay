import LessonCard from "@/components/course/LessonCard";
import Review from "@/components/instructor/reviews/Review";
import { useTranslation } from "react-i18next";
import courseDetails from "../../../assets/images/courseDetails.png";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/instructor-courses-api";

export default function InstructorCourseDetails() {
  type Lesson = {
     id: number,
     title: string,
     video_url: string,
   }
   type review ={
    id: number
     
     review : string
     rating : number
     created_at: string
      user: { //id: number,
                    name: string,}  

   }
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  console.log("courseId from params:", courseId);

const {data ,error , isLoading,isFetching } = useQuery({
     queryKey: ["course", courseId],
queryFn: async()=>{
       const { data } = await axiosInstance.get(
      `/instructor/courses/${courseId}`,
      {
        headers: { Accept: 'application/json' ,
        },
          
      })
       console.log("Course data:", data);

return data.data
}

  });
  if (error) {
   console.error("Query error:", error);
 }
console.log("isLoading:", isLoading, "isFetching:", isFetching);


  return (
    <section className="container py-12 space-y-6 ">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className="space-y-3 ">
        <img
          src={courseDetails}
          alt="courseDetails image"
          className="max-h-[350px] lg:max-h-[400px] object-fill w-full "
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {data?.title}
          </h2>
          <p className=" text-gray-600 leading-relaxed ">
           {data?.description}
          </p>
 
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <h3 className="border w-fit px-3 py-1 border-rate rounded-md font-bold ">
            {t("instructor.lessons.title")}
          </h3>
          <Link to={`/instructor/my-courses/${courseId}/manage`}>
            <Button className="border text-white w-fit px-3 py-1 border-rate rounded-md font-bold">
              Manage Course
            </Button>
          </Link>
        </div>
      

                {data?.lessons?.map((lesson: Lesson , index: number) => (
          <LessonCard key={lesson.id || index} lesson={lesson} index={index}/>
        ))}

       
      </div>

      <div className="">
       
        {data?.reviews?.map(( review: review ) => (
      <Review
           key={review.id}    
          variant="user"
          review={review}
         
        />
        ))}
        
      
      </div>
    </section>
  );
}
