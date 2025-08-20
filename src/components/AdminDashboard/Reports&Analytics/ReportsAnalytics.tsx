import { Loader2, Download, Star } from "lucide-react";
import { useReports } from "./reports-hooks";

function ReportsAnalytics() {
    const { data: reports, isLoading, error } = useReports();
//   const isLoading = false;
//   const error = false;
//   const reports = {
//     generalStats: {
//       instructors: 5,
//       learners: 6,
//       courses: 15,
//       earnings: 0,
//     },
//     courseRatings : [
//       {
//         course_name: "Illo quaerat iusto eveniet.",
//         avg_rating: 3.79999999999999982236431605997495353221893310546875,
//       },
//       {
//         course_name: "Aut autem quibusdam dignissimos sed soluta tempore at.",
//         avg_rating: 3.569999999999999840127884453977458178997039794921875,
//       },
//       {
//         course_name: "Quasi sed temporibus est recusandae nulla eos.",
//         avg_rating: 3.5,
//       },
//       {
//         course_name: "Minima adipisci nihil beatae repellat optio consequatur.",
//         avg_rating: 3.3300000000000000710542735760100185871124267578125,
//       },
  
//     ],
//   };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading reports...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-800">Failed to load reports data</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Track platform performance with real-time insights and exportable
          reports.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded border p-4">
          <div className="text-sm text-gray-600">Learners:</div>
          <div className="text-lg font-medium">
            {formatNumber(reports?.generalStats.learners || 0)}
          </div>
        </div>

        <div className="bg-white rounded border p-4">
          <div className="text-sm text-gray-600">Instructors:</div>
          <div className="text-lg font-medium">
            {formatNumber(reports?.generalStats.instructors || 0)}
          </div>
        </div>

        <div className="bg-white rounded border p-4">
          <div className="text-sm text-gray-600">Courses:</div>
          <div className="text-lg font-medium">
            {formatNumber(reports?.generalStats.courses || 0)}
          </div>
        </div>

        <div className="bg-white rounded border p-4">
          <div className="text-sm text-gray-600">Earnings:</div>
          <div className="text-lg font-medium">
            ${formatNumber(reports?.generalStats.earnings || 0)}
          </div>
        </div>
      </div>

      {/* Course Ratings Table */}
      <div className="bg-white rounded border">
        <div className="border-b p-4">
          <div className="grid grid-cols-2 font-medium text-gray-700">
            <div>Course</div>
            <div>Rating</div>
          </div>
        </div>

        <div className="divide-y">
          {reports?.courseRatings.map((course, index) => (
            <div key={index} className="p-4 grid grid-cols-2 items-center">
              <div className="font-medium text-gray-900">
                {course.course_name}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-700">
                  {formatRating(course.avg_rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
