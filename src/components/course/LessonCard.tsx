import courseDetail from '../../../src/assets/images/courseDetails.png'

export default function LessonCard() {
  return (
    <>
    <div className='flex gap-6  items-center'>
        <img src={courseDetail} alt="course Detail image " className="h-16 w-20 object-fill rounded-lg overflow-hidden" />
        <div className='flex gap-3 items-center'>
        <p>Lesson 1: Introduction to UI/UX</p>
        </div>
    </div>
     </>
  )
}
