import { Link } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import { courses } from "../../data/BrowseCourses";
import { useTranslation } from "react-i18next";

function CardCourse() {
  const { t } = useTranslation();

  return (
    <>
      {courses.map((course) => (
        <Link to={`${course.id}`} key={course.id}>
          <div className="mb-20">
            <div>
              <img
                className="w-full border border-[--category] rounded-lg"
                src={course.image}
                alt={course.title}
                loading="lazy"
              />
            </div>
            <div className="border-2 w-full border-[--category] rounded-2xl mt-3 px-4 py-3 shadow">
              <h5 className="font-[600] text-lg lg:text-lg xl:text-xl truncate">
                {course.title}
              </h5>
              <p className="text-sm my-2 text-[--secondary-dark]">
                {t("common.by")} {course.instructor}
              </p>
              <div className="flex items-center">
                <img src={StarIcon} alt="Ratings" />
                <span className="lg:text-md text-sm font-[600] ml-2">
                  ({course.ratings} {t("common.ratings")})
                </span>
              </div>
              <p className="text-md my-4 truncate">{course.duration}</p>
              <div className="flex justify-between flex-col md:flex-row items-center text-xl font-[600]">
                <h4 className="mb-5 lg:mb-0">{course.price}</h4>
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
