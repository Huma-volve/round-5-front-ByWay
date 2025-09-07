import { Link } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import ImgNotFound from "@/assets/images/image-not-found.png";
import useFetchMyCourses from "@/hooks/LearnerCourses/useFetchMyCourses";

export default function LearnerMyCourseCard() {
  const { data: Courses } = useFetchMyCourses();
  if (!Courses) {
    return (
      <div className="grid col-span-5 place-items-center h-60">
        No courses found
      </div>
    );
  }
  return (
    <>
      {Courses?.map((course) => (
        <Link to={`${course.course_id}`} key={course.course_id}>
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
                By {course.instructor}
              </p>
              <div className="flex items-center">
                {Array.from({ length: Number(course.average_rating) || 0 }).map(
                  (_, index) => (
                    <img key={index} src={StarIcon} alt="Ratings" />
                  )
                )}
                <span className="lg:text-md text-sm font-[600] ml-2">
                  (0 Ratings)
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
