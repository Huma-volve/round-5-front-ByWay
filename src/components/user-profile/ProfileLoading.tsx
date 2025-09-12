const ProfileLoading = () => {
  return (
    <div className="container m-8 p-12 rounded-[10px] border-2 border-border animate-pulse">
      {/* Cover & Image */}
      <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end">
        <div className="w-32 h-32 mb-[-20px] rounded-full bg-gray-300"></div>
      </div>

      {/* Edit Button */}
      <div className="w-8 h-8 bg-gray-300 rounded-full absolute mt-[-20px] right-[15%]"></div>

      {/* Social Links */}
      <div className="flex gap-8 flex-wrap justify-center mt-[50px] text-secondary">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>

      {/* User Info */}
      <div className="ml-[10%] lg:ml-[25%] flex flex-col m-auto justify-center">
        <div className="flex gap-8 md:gap-80 flex-wrap my-8">
          <div>
            <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="my-8">
          <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        <div>
          <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-60 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
