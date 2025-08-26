import { Link } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import ImgNotFound from "@/assets/images/image-not-found.png";
import useFetchMyCourses from "@/hooks/LearnerCourses/useFetchMyCourses";

export default function LearnerMyCourseCard() {
  const { data: Courses } = useFetchMyCourses();
  return (
    <>
      {Courses?.map((course) => (
        <Link to={`${course.course_id}`} key={course.id}>
          <div className="mb-20">
            <div>
              <img
                className="w-full h-36 border border-[--category] rounded-2xl"
                src={course.course_image_url || ImgNotFound}
                alt={course.title}
                loading="lazy"
              />
            </div>

            <div className="border-2 w-full border-[--category] rounded-2xl mt-3 px-4 py-3 shadow">
              <h5 className="font-[600] text-lg lg:text-lg xl:text-xl truncate">
                {course.title}
              </h5>
              <p className="text-sm my-2 text-[--secondary-dark]">
                By {course.instructor?.name}
              </p>
              <div className="flex items-center">
                {Array.from({ length: Number(course.rating) || 1 }).map(
                  (_, index) => (
                    <img key={index} src={StarIcon} alt="Ratings" />
                  )
                )}
                <span className="lg:text-md text-sm font-[600] ml-2">
                  (100 Ratings)
                </span>
              </div>
              <p className="text-xs my-4 truncate">{course.description}</p>
              <div className="mt-5">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${parseInt(course.progress)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
