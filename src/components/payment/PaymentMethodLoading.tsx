// components/common/PaymentSkeleton.tsx
export default function PaymentMethodLoading() {
  return (
    <div className="bg-background min-h-screen animate-pulse">
      {/* Breadcrumb placeholder */}
      <div className="m-4 mt-8">
        <div className="h-4 w-40 bg-gray-200 rounded mb-6 mt-5" />
      </div>

      <div className="lg:flex gap-4 w-100 mt-8">
        {/* Left side (PaymentMethod form skeleton) */}
        <div className="min-w-[60%] h-[200px] p-8 mx-auto rounded-lg bg-[#F8FAFC] space-y-4">
          <div className="h-12 bg-gray-200 rounded" /> {/* Card input */}
          <div className="h-10 bg-gray-300 rounded" /> {/* Button */}
          <div className="h-4 w-2/3 bg-gray-200 rounded" /> {/* message */}
        </div>

        {/* Right side (methods list skeleton) */}
        <div className="w-100 lg:w-[30%] h-[75vh] overflow-y-auto pr-2">
          <div className="h-4 w-32 bg-gray-200 rounded mt-8 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 bg-gray-100 p-4 rounded-[8px] w-80"
              >
                <div className="h-4 w-16 bg-gray-300 rounded" />
                <div className="h-5 w-5 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
