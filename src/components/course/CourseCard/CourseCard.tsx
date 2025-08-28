import courseImg from "../../../assets/images/course.png";
import instructorCourse from "../../../assets/images/instructorcourse.jpg";
import { Link } from "react-router-dom";

type cardProps =  {
  variant?: "myCourses" | "instructor";
  id: string;
  course?: {
    name?: string;
    key?: number;
    description?:string;
    title?: string;
    rate?: number;
    price?: number;
    image_url?: string | null;
  };

};
export default function CourseCard({
  id,
  course,
  variant = "instructor",
}: cardProps) {
 
  return (
    <>
   

      <Link
        to={`/instructor/course-details/${id}`}
        className="w-full rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-100 flex flex-col h-full"
      >
        <div className="h-48 overflow-hidden">
          {variant === "instructor" ? (
            <img
              src={course?.image_url ?? instructorCourse}
              alt="Instructor"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={courseImg}
              alt="Instructor"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-4">
          {variant === "instructor" ? (
            <h2 className="text-xl font-semibold text-gray-800">
              {course?.title}
            </h2>
          ) : (
            <h2 className="text-xl font-semibold text-gray-800">"name"</h2>
          )}

          {variant === "instructor" ? (
            <p className="text-gray-500 text-sm mb-4">{course?.title}</p>
          ) : (
            <p className="text-gray-500 text-sm mb-4">{course?.title}</p>
          )}

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600 text-sm">(rate)</span>
          </div>

          {variant === "instructor" ? (
            <>
              <p className="text-gray-500 text-sm ">
               {course?.description} 
              </p>
              <h3 className="font-semibold ">{course?.price} EGP</h3>
            </>
          ) : (
            ""
          )}
        </div>
      </Link>
    </>
  );
}
