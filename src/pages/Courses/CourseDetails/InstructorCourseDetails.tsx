import LessonCard from "@/components/course/LessonCard";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useInstructorCourseDetails } from "@/api/useInstructorCourseDetails";
import { getFullImageUrl } from "@/utils/image";

export default function InstructorCourseDetails() {
  type Lesson = {
    id: number;
    title: string;
    video_url: string;
    description: string;
    image_url:  string;
    status?: string;
  };

  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  console.log("courseId from params:", courseId);

 const { data, error, isLoading } = useInstructorCourseDetails(courseId!);

  if (error) {
    console.error("Query error:", error);
  }
  console.log("isLoading:", isLoading);

  return (
    <section className="container py-12 space-y-6 ">
    
      <div className="space-y-3 ">
   <img
  src={getFullImageUrl(data?.data.image_url)}
  alt="courseDetails image"
  className="max-h-[350px] lg:max-h-[400px] object-fill w-full"
/>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{data?.data.title}</h2>
          <p className=" text-gray-600 leading-relaxed ">{data?.data.description}</p>
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

        {data?.data.lessons?.map((lesson: Lesson, index: number) => (
          <LessonCard key={lesson.id || index} lesson={lesson} index={index} />
        ))}
      </div>

     
    </section>
  );
}
