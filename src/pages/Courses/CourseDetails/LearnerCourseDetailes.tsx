import LessonCard from "@/components/course/LessonCard";
import courseDetails from "../../../assets/images/courseDetails.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FeedbackModal from "@/components/instructor/Modal/FeedBackModal";

export default function LearnerCourseDetails() {
  const { t } = useTranslation();
  const [watched, setWatched] = useState<{ [key: number]: boolean }>({});
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); 

  const lessons = [1, 2, 3, 4, 5, 6];

  const toggleWatched = (id: number) => {
    setWatched((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirmFeedback = (rating: number, comment: string) => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setIsFeedbackOpen(false);
  };

  return (
    <section className="container py-12 space-y-8">
      <div className="flex flex-col lg:flex-row-reverse gap-6 items-center">
        <div className="flex-shrink-0 lg:w-1/2 w-full">
          <img
            src={courseDetails}
            alt="courseDetails image"
            className="max-h-[350px] lg:max-h-[400px] object-cover w-full rounded-lg"
          />
        </div>

        <div className="space-y-2 lg:w-1/2 w-full">
          <h2 className="text-2xl font-bold">
            Introduction to user interface and user experience design
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Begin your journey in user interface and user experience design.
            <br />
            You'll learn to design wireframes, user flows, and interactive
            prototypes using Figma.
          </p>
          <h4 className="font-medium">{t("common.instructor")}: Omnya Ali</h4>
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

        {lessons.map((lessonId) => (
          <div
            key={lessonId}
            className="flex items-center justify-between gap-3 border p-3 rounded-lg flex-wrap"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500"
                checked={watched[lessonId] || false}
                onChange={() => toggleWatched(lessonId)}
              />
              <LessonCard />
            </div>
          </div>
        ))}
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onConfirm={handleConfirmFeedback}
      />
    </section>
  );
}
