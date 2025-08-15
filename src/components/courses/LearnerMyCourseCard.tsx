import { Link } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import { LearnerMyCourse } from "../../data/LeanerMyCourse";

export default function LearnerMyCourseCard() {
  return (
    <>
      {LearnerMyCourse.map((course) => (
        <Link to={`${course.id}`} key={course.id}>
          <div className="mb-20">
            {/* صورة الكورس */}
            <div>
              <img
                className="w-full border border-[--category] rounded-lg"
                src={course.image}
                alt={course.title}
                loading="lazy"
              />
            </div>

            {/* بيانات الكورس */}
            <div className="border-2 w-full border-[--category] rounded-2xl mt-3 px-4 py-3 shadow">
              <h5 className="font-[600] text-lg lg:text-lg xl:text-xl truncate">
                {course.title}
              </h5>
              <p className="text-sm my-2 text-[--secondary-dark]">
                By {course.instructor}
              </p>
              <div className="flex items-center">
                <img src={StarIcon} alt="Ratings" />
                <span className="lg:text-md text-sm font-[600] ml-2">
                  ({course.ratings} Ratings)
                </span>
              </div>
              <p className="text-xs my-4 truncate">{course.duration}</p>
              {/* Progress Bar */}
              {course.progress !== undefined && (
                <div className="mt-5">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
