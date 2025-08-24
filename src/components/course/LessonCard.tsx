import { Link } from "react-router-dom";
 type lesson_card_prop = {
    index: number;
     lesson: {
        title: string,
     video_url: string,
     }
    
   }
export default function LessonCard({lesson , index}: lesson_card_prop) {
  
  return (
    <>
    <div className='flex gap-6  items-center'>
        {/* <Link to={lesson.video_url}  className="h-16 w-20 object-fill rounded-lg overflow-hidden" >
            <span className="text-xs text-center">Video</span>
        </Link> */}
        <Link
  to={lesson.video_url}
  className="h-16 w-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
>
  <span className="text-xs text-center">Video</span>
</Link>

        
        <div className='flex gap-3 items-center'>
        <p>Lesson {index + 1}: {lesson.title}</p>
        </div>
    </div>
     </>
  )
}
