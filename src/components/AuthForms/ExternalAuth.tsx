function ExternalAuth() {
  return (
    <div className="space-y-4 md:w-[80%] lg:w-[50%]">
      <div className="mt-10 relative flex items-center justify-center gap-2">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <p className="px-2 text-sm text-gray-500 whitespace-nowrap">or</p>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      <div className="flex gap-5 justify-between *:flex-1">
        <div className="py-2 px-5 flex justify-center items-center border border-gray-500 rounded-md">
          <div className="flex items-center gap-4">
            <img src="/facebook.svg" className="w-[20px]" />
            <h3 className="text-md text-blue-600">Facebook</h3>
          </div>
        </div>
        <div className="py-2 px-5 flex justify-center items-center border border-gray-500 rounded-md">
          <div className="flex items-center gap-4">
            <img src="/google.svg" className="w-[20px]" />
            <h3 className="text-md text-red-600">google</h3>
          </div>
        </div>
        <div className="py-2 px-5 flex justify-center items-center border border-gray-500 rounded-md">
          <div className="flex items-center gap-4">
            <img src="/microsoft.svg" className="w-[20px]" />
            <h3 className="text-md text-black-400">Microsoft</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExternalAuth;
