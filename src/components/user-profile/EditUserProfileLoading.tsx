
function EditUserProfileLoading() {
return (
      <div className="container m-8 p-12 animate-pulse">
        <div className="flex gap-4 m-3">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* صورة البروفايل */}
        <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end">
          <div className="w-32 h-32 mb-[-20px] rounded-full bg-gray-300"></div>
        </div>

        <div className="ml-[10%] flex flex-col m-auto justify-center mt-8">
          {/* First Name + Last Name */}
          <div className="flex gap-8 lg:gap-80 flex-wrap my-8">
            <div>
              <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
              <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
              <div className="h-10 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Headline */}
          <div className="my-8">
            <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
            <div className="h-16 w-[90%] bg-gray-200 rounded"></div>
          </div>

          {/* About */}
          <div>
            <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
            <div className="h-20 w-[90%] bg-gray-200 rounded"></div>
          </div>

          {/* Links */}
          <div className="border-2 border-border rounded-[8px] w-[90%] p-8 mt-8 space-y-4">
            <div className="h-5 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>

          {/* Save Button */}
          <div className="h-10 w-28 bg-gray-300 rounded mt-6 self-end"></div>
        </div>
      </div>
    );
  
}

export default EditUserProfileLoading
