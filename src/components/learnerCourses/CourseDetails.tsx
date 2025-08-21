import StarIcon from "../../assets/images/icons/StarIcon.svg";
import VideoIcon from "../../assets/images/icons/VideoIcon.svg";
import Review from "../instructor/reviews/Review";
import Breadcrumb from "../common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import useFetchCourseDetails from "@/hooks/LearnerCourses/useFetchCourseDetails";

function CourseDetails() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { data: course, error, isLoading } = useFetchCourseDetails("19");
  return (
    <div className="md:mx-24 mx-5 mt-12">
      {/* The Stack pages */}
      <div>
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      <div>
        <h3 className="text-[--rate] font-[600] text-2xl">{course?.title || "UI/UX Design"}</h3>
        <p className="secondary-dark mt-1 mb-5">
          {t("common.createdBy")} {course?.instructor?.name || "John Doe"}
        </p>
        {/* <p className="text-xl font-[600]">
          {t("common.introductionTo")} user interface and user experience design
        </p> */}
        <p className="text-[--secondary] my-2">
         {course?.description || "description"}
        </p>
        <p className="text-lg font-[500]">
          {t("common.duration")}: 7 {t("common.weeks")}
        </p>
        <div className="flex items-center gap-3 my-4">
          <p className="text-white px-2 rounded-lg bg-[--secondary]">
            {t("common.bestseller")}
          </p>
          <p>({course?.price} {t("common.ratings")})</p>
          <img src={StarIcon} alt="StarIcon" />
        </div>
        <div>
          <p className="text-xl font-[600] text-[--success]">400 EGP</p>
          <button className="mt-3 mb-7 px-20 py-2 text-white bg-[--success] text-lg md:text-xl rounded-lg w-full sm:w-auto">
            {t("common.buyNow")}
          </button>{" "}
          <p className="mt-3 mb-7 border-[--rate] px-7 py-1 border text-lg md:text-xl rounded-lg w-fit">
            {t("common.content")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-14 border w-fit py-3 px-7 rounded-xl mb-8">
          <img className="w-7 md:w:10" src={VideoIcon} alt="VideoIcon" />
          <p className="md:text-xl text-md font-[500]">
            {t("common.lesson")} 1: {t("common.introductionTo")} UI/UX
          </p>
        </div>
      </div>
      <Review
        variant="user"
        name="john albert"
        review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down"
        rating={3}
        date="Aug 2025"
      />

      <Review
        variant="user"
        name="john albert"
        review="I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down"
        rating={3}
        date="Aug 2025"
      />
    </div>
  );
}

export default CourseDetails;
