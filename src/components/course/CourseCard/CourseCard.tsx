import courseImg from "../../../assets/images/course.png";
import instructorCourse from "../../../assets/images/instructorcourse.jpg";
import { Link } from "react-router-dom";

type cardProps = {
  variant?: "myCourses" | "instructor";
  id: string;
  course?: {
    id: number;
    title: string;
    description: string;
    status: string;
    avg_rating?: number;
    reviews_count?: number;
    price?: number | string;
    image_url?: string;
  };
};

export default function CourseCard({
  id,
  course,
  variant = "instructor",
}: cardProps) {
  return (
    <Link
      to={`/instructor/course-details/${id}`}
      className="w-full rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-100 flex flex-col h-full"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={variant === "instructor" ? course?.image_url ?? instructorCourse : courseImg}
          alt={course?.title ?? "Course"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow ">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {course?.title ?? "Untitled"}
        </h2>

        <p className="text-gray-500 text-sm mb-4 truncate">
          {course?.description ?? "No description available"}
        </p>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < (course?.avg_rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600 text-sm">({course?.reviews_count ?? 0})</span>
        </div>

        {variant === "instructor" && (
          <h3 className="font-semibold">{course?.price ?? "Free"} EGP</h3>
        )}
      </div>
    </Link>
  );
}
