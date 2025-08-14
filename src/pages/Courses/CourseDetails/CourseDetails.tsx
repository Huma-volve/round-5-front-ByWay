import LessonCard from "@/components/course/LessonCard"
import courseDetails from "../../../assets/images/courseDetails.png"
import Review from "@/components/instructor/reviews/Review"

export default function CourseDetails() {
  return (
       <section className="container py-12 space-y-6 ">
      <div className="space-y-3 ">
         <img src={courseDetails} alt="courseDetails image" className="max-h-[350px] lg:max-h-[400px] object-fill w-full " />
            <div className="space-y-2">
            <h2 className="text-2xl font-bold">Introduction to  user interface and user experience design</h2>
           <p className=" text-gray-600 leading-relaxed ">Begin your journey in user interface and user experience design. <br /> You'll learn to design wireframes, user flows, and interactive prototypes using Figma.</p>
           <h4 className="">Instructor: Omnya Ali</h4>
            </div>
          </div>

<div className="space-y-4">
  <h3 className="border w-fit px-3 py-1 border-rate rounded-md font-bold ">Lessons</h3>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
  <LessonCard/>
</div>

  <Review variant="course" courseName="React Basics" review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down" rating={4} name="John" />
<Review variant="user"    name="Mohamed" review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down" rating={5} date="Aug 2025" />

   
  </section>
  )
}
