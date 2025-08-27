import LessonCard from "@/components/learnerCourses/LessonCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FeedbackModal from "@/components/instructor/Modal/FeedBackModal";
import { Link, useParams } from "react-router-dom";
import useFetchMyCoursesDetails from "@/hooks/LearnerCourses/useFetchMyCoursesDetailes";
import useAddReviewLearner from "@/hooks/LearnerCourses/useAddReviewLearner";
import { toast } from "react-toastify";

export default function LearnerCourseDetails() {
  const { learnerCourseId } = useParams<{ learnerCourseId: string }>();
  const { t } = useTranslation();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { data: courseDetails } = useFetchMyCoursesDetails(learnerCourseId!);
  const { addReview, isSuccess, isError, data, error } = useAddReviewLearner(
    learnerCourseId!
  );

  // handleConfirmFeedback
  const handleConfirmFeedback = (rating: number, comment: string) => {
    setIsFeedbackOpen(false);
    addReview({ rating, review: comment });
    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (isError) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="container py-12 space-y-8">
      <div className="flex flex-col lg:flex-row-reverse gap-6 items-center">
        <div className="flex-shrink-0 lg:w-1/2 w-full">
          <video
            src={courseDetails?.video_url}
            controls
            className="max-h-[350px] lg:max-h-[400px] object-cover w-full rounded-lg"
          />
        </div>

        <div className="space-y-2 lg:w-1/2 w-full">
          <h2 className="text-2xl font-bold">{courseDetails?.title}</h2>
          <p className="text-gray-600 leading-relaxed">
            {courseDetails?.description}
          </p>
          <h4 className="font-medium">
            {t("common.instructor")}:{" "}
            <Link
              to={`/${courseDetails?.instructor?.id}/instructor-details`}
              className="hover:text-blue-600"
            >
              {courseDetails?.instructor?.name}
            </Link>
          </h4>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="border w-fit px-3 py-1 border-rate rounded-md font-bold">
            {t("instructor.lessons.title")}
          </h3>
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {t("user.Send Feedback")}
          </button>
        </div>
        {courseDetails?.content.map(
          (
            lesson: {
              id: number;
              title: string;
              video_url: string;
            },
            index: number
          ) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between gap-3 border p-3 rounded-lg flex-wrap"
            >
              <div className="flex items-center gap-3">
                <LessonCard lesson={lesson} index={index} />
              </div>
            </div>
          )
        )}
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onConfirm={handleConfirmFeedback}
      />
    </section>
  );
}
