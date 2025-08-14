import LessonCard from "@/components/course/LessonCard"
import courseDetails from "../../../assets/images/courseDetails.png"
import Review from "@/components/instructor/reviews/Review"
import { useTranslation } from "react-i18next";


export default function CourseDetail() {
  const {t} = useTranslation()
  return (
       <section className="container py-12 space-y-6 ">
      <div className="space-y-3 ">
         <img src={courseDetails} alt="courseDetails image" className="max-h-[350px] lg:max-h-[400px] object-fill w-full " />
            <div className="space-y-2">
            <h2 className="text-2xl font-bold">Introduction to  user interface and user experience design</h2>
           <p className=" text-gray-600 leading-relaxed ">Begin your journey in user interface and user experience design. <br /> You'll learn to design wireframes, user flows, and interactive prototypes using Figma.</p>
           <h4 className="">{t("common.instructor")}: Omnya Ali</h4>
            </div>
          </div>

<div className="space-y-4">
  <h3 className="border w-fit px-3 py-1 border-rate rounded-md font-bold ">{t("instructor.lessons")}</h3>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
</div>

<div className="">
  <Review variant="user"    name="tom albert" review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down" rating={2} date="Mar 2025" />
<Review variant="user"    name="john albert" review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down" rating={3} date="Aug 2025" />

</div>
   
  </section>
  )
}
