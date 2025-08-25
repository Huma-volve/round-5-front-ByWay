import StarIcon from "../../assets/images/icons/StarIcon.svg";
import VideoIcon from "../../assets/images/icons/VideoIcon.svg";
import Review from "../instructor/reviews/Review";
import Breadcrumb from "../common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import useFetchCourseDetails from "@/hooks/LearnerCourses/useFetchCourseDetails";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

function CourseDetails() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { courseId } = useParams<{ courseId: string | undefined }>();
  const { data: course, error, isLoading } = useFetchCourseDetails(courseId!);
  if (!courseId) {
    return (
      <div className="flex items-center justify-center h-screen">
        course ID not provided
      </div>
    );
  }
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
    <div className="md:mx-24 mx-5 mt-12">
      {/* The Stack pages */}
      <div>
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      <div>
        <h3 className="text-[--rate] font-[600] text-2xl">
          {course?.title || "UI/UX Design"}
        </h3>
        <p className="block secondary-dark my-3">
          {t("common.createdBy")}{" "}
          <Link
            to={`/${course?.instructor?.id}/instructor-details`}
            className="hover:text-[--rate]"
          >
            {course?.instructor?.name || "Mohamed Gomaa"}
          </Link>
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
        <div className="flex items-center gap-3  my-4">
          <p className="text-white px-2 rounded-lg bg-[--secondary]">
            {t("common.bestseller")}
          </p>
          <p>
            ({course?.reviews?.length || 0} {t("common.ratings")})
          </p>
          <div className="flex gap-1">
            {Array.from(
              { length: Math.floor(course?.reviews_count || 0) },
              (_, index) => (
                <img key={index} src={StarIcon} alt="StarIcon" />
              )
            )}
          </div>
        </div>
        <div>
          <p className="text-xl font-[600] text-[--success]">
            {course?.price} EGP
          </p>
          <Link to="/checkout">
            <button className="mt-3 mb-7 px-20 py-2 text-white bg-[--success] text-lg md:text-xl rounded-lg w-full sm:w-auto">
              {t("common.buyNow")}
            </button>{" "}
          </Link>
          <p className="mt-3 mb-7 border-[--rate] px-7 py-1 border text-lg md:text-xl rounded-lg w-fit">
            {t("common.content")}
          </p>
        </div>
      </div>
      <div>
        {course?.content.map((content) => (
          <div key={content.id} className="flex items-center gap-6 border w-fit py-3 px-7 rounded-xl mb-8">
            <img className="w-5 md:w:10" src={VideoIcon} alt="VideoIcon" />
            <Link
              to={`/learner-myCourses/${courseId}`}
              className="md:text-xl text-md font-[500] truncate w-48 md:w-96 hover:text-[--rate]"
            >
              {t("common.lesson")} {content.id}: {t("common.introductionTo")}{" "}
              {content.title}
            </Link>
          </div>
        ))}
      </div>
      {course?.reviews.map((review, index) => (
        <Review
          key={index}
          variant="user"
          name={review.learner_name}
          review={review.review}
          rating={review.rating}
          date={review.created_at}
          imageLearner={review.learner_image}
        />
      ))}
    </div>
  );
}

export default CourseDetails;
