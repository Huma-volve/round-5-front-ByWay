import { useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import useFetchMyCoursesDetails from "@/hooks/LearnerCourses/useFetchMyCoursesDetailes";

function VideoLearner() {
  const { videoId } = useParams<{ videoId: string }>();
  const { learnerCourseId } = useParams<{ learnerCourseId: string }>();
  const { data: courseDetails } = useFetchMyCoursesDetails(learnerCourseId!);

  // filteredContent with videoId
  const filteredContent: {
    id: number;
    title: string;
    video_url: string;
  }[] =
    courseDetails?.content
      ?.filter((item) => item.id === Number(videoId))
      .map((item) => ({
        id: item.id,
        title: item.title,
        video_url: item.video_url,
      })) ?? [];
  return (
    <>
      <div>
        <video
          controls
          autoPlay
          className="w-full max-w-4xl rounded-lg shadow-lg"
        >
          <source src={filteredContent[0].video_url} type="video/mp4" />
        </video>
        <h2 className="text-2xl font-semibold mt-10 mb-14">
          Lesson {filteredContent[0].id} : {filteredContent[0].title}
        </h2>
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
    </>
  );
}

export default VideoLearner;
