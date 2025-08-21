import { Link, useNavigate } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import { useTranslation } from "react-i18next";
import useFetchCourses from "@/hooks/LearnerCourses/useFetchCourses";
import { Loader2 } from "lucide-react";
import ImgProduct from "../../assets/images/ui-product.png";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function CardCourse() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role] = useLocalStorage("role", "");
  const { data: courses, error, isLoading } = useFetchCourses();

  const handleInstructorClick = (instructorId: string) => {
    navigate(`/${instructorId}/instructor-details`);
  };
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading reviews
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      {courses.map((course) => (
        <Link
          to={`${
            role === "instructor"
              ? `/instructor/course-details/${course.id}`
              : `courses/${course.id}`
          }`}
          key={course.id}
        >
          <div className="mb-20">
            <div>
              <img
                className="w-full border border-[--category] rounded-lg"
                src={course.image || ImgProduct}
                alt={course.title}
                loading="lazy"
              />
            </div>
            <div className="border-2 w-full border-[--category] rounded-2xl mt-3 px-4 py-3 shadow">
              <h5 className="font-[600] text-lg lg:text-lg xl:text-xl truncate">
                {course.title}
              </h5>
              <Link
                to={`/${course.user.id}/instructor-details`}
                className="text-sm my-2 text-[--secondary-dark] hover:text-blue-500 cursor-pointer"
              >
                {t("common.by")} {course.user.name}
              </Link>
              <div className="flex items-center">
                {Array.from({ length: Number(course.rating) || 1 }).map(
                  (_, index) => (
                    <img key={index} src={StarIcon} alt="Ratings" />
                  )
                )}
                <span className="lg:text-md text-sm font-[600] ml-2">
                  ({500} {t("common.ratings")})
                </span>
              </div>
              <p className="text-md my-4 truncate">{course.description}</p>
              <div className="flex justify-between text-md flex-col md:flex-row items-center font-[600]">
                <h4 className="mb-5 lg:mb-0">{course.price} EGP</h4>
                <button className="bg-[--success] py-1 px-2 rounded-lg text-white">
                  {t("common.addToCart")}
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default CardCourse;
