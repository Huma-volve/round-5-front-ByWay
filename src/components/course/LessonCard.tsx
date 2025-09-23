import { getFullMediaUrl } from "@/utils/media";
// import { useRef } from "react";
type lesson_card_prop = {
  index: number;
  lesson: {
    title: string;
    video_url: string;
  };
};
export default function LessonCard({ lesson, index }: lesson_card_prop) {
  // const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <>
      <div className="flex gap-6  items-center">
        {/* {videoRef.current && <span>"Video Duration:", {videoRef.current.duration % 60}</span>} */}
        {/* <Link
  to={lesson.video_url}
  className="h-16 w-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
>
  <span className="text-xs text-center">Video</span>
</Link> */}

        <video
          // ref={videoRef}
          controls
          className="w-full  rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
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
