import { Link } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import ImgNotFound from "@/assets/images/image-not-found.png";
import useFetchMyCourses from "@/hooks/LearnerCourses/useFetchMyCourses";

export default function LearnerMyCourseCard() {
  const { data: Courses } = useFetchMyCourses();
  if (!Courses) {
    return (
      <div className="grid col-span-5 place-items-center h-60 text-gray-500">
        No courses found
      </div>
    );
  }
  return (
    <>
      {Courses?.map((course) => (
        <Link to={`${course.course_id}`} key={course.course_id}>
          <div className="group mb-12 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            {/* Image */}
            <div className="relative">
              <img
                className="w-full h-40 sm:h-48 md:h-56 object-cover border border-gray-200 rounded-2xl"
                src={course.course_image_url || ImgNotFound}
                alt={course.title}
                loading="lazy"
              />
              <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {parseInt(course.progress)}% Complete
              </span>
            </div>

            {/* Card Content */}
            <div className="border border-gray-200 bg-white rounded-2xl mt-4 px-5 py-4 shadow-md transition-colors group-hover:border-blue-400">
              <h5 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 truncate">
                {course.title}
              </h5>
              <p className="text-sm my-2 text-gray-500">By {course.instructor}</p>

              {/* Ratings */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Number(course.average_rating) || 0 }).map(
                  (_, index) => (
                    <img
                      key={index}
                      src={StarIcon}
                      alt="Ratings"
                      className="w-4 h-4"
                    />
                  )
                )}
                <span className="text-xs sm:text-sm font-medium text-gray-600 ml-1">
                  ({course.average_rating || 0} Ratings)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm my-3 text-gray-600 line-clamp-2">
                {course.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${parseInt(course.progress)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
