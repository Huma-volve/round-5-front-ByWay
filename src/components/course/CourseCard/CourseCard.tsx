import courseImg from '../../../assets/images/course.png'
export default function CourseCard() {
  return (
    <>
    <div className="max-w-sm mx-auto mt-20 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-100">
     
      <div className="h-48 overflow-hidden">
        <img
          src={courseImg}
          alt="Instructor"
          className="w-full h-full object-cover"
        />
      </div>

    
      <div className="p-6">
      
        <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>

        
        <p className="text-gray-500 text-sm mb-4">Frontend Developer</p>

       
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600 text-sm">(4.9)</span>
        </div>

      
      </div>
    </div>
    
    </>
  )
}
