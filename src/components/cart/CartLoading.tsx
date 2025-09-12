const CartLoading = () => {
  return (
      <div className="flex flex-wrap items-start justify-between animate-pulse">
        {/* Skeleton Cart Items */}
        <div className="w-[100%] lg:w-[65%] my-2">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <hr className="border-t-2 border-border w-full mb-4" />
          {[1, 2].map((i) => (
            <div key={i} className="my-4 flex gap-3">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skeleton Total Cost */}
        <div className="w-[100%] lg:w-[30%] my-12">
          <div className="bg-gray-100 rounded-[8px] p-4 border border-border flex flex-col gap-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }
export default CartLoading;
