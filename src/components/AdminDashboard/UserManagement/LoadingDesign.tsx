export default function LoadingDesign(){
   return(
              <div>
        <div className="w-full mt-8 mb-12 overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <div className="min-w-[700px]">
            <div className="flex bg-gray-100 p-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>        
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex p-4 border-b border-gray-200 gap-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="flex-1 h-5 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    )
}