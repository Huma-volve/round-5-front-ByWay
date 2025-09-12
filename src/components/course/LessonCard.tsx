import { getFullMediaUrl } from "@/utils/media";
type lesson_card_prop = {
  index: number;
  lesson: {
    title: string;
    video_url: string;
  };
};
export default function LessonCard({ lesson, index }: lesson_card_prop) {
  return (
    <>
      <div className="flex gap-6  items-center">
        {/* <Link
  to={lesson.video_url}
  className="h-16 w-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
>
  <span className="text-xs text-center">Video</span>
</Link> */}

        <video
          controls
          className="w-full h-16 w-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
        >
          <source src={getFullMediaUrl(lesson.video_url)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex gap-3 items-center">
          <p>
            Lesson {index + 1}: {lesson.title}
          </p>
        </div>
      </div>
    </>
  );
}
