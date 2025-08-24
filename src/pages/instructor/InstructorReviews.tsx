import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import type { InstructorReview } from "../../data/instructorReviewsData";
import type { LaravelPagination } from "../../utils/paginationSimulator";
import Review from "../../components/instructor/reviews/Review";
import Breadcrumb from "../../components/common/Breadcrumb";
import { paginateLaravel } from "../../utils/paginationSimulator";
import INSTRUCTOR_REVIEWS_DATA from "../../data/instructorReviewsData";

export default function InstructorReviews() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();

  const [page, setPage] = useState(1);

  const pagination: LaravelPagination<InstructorReview> = paginateLaravel(
    INSTRUCTOR_REVIEWS_DATA,
    page,
    3
  ); // 2 per page for demo

  function handleClickPage(link: { label: string }) {
    if (link.label === "<") {
      setPage((p) => Math.max(p - 1, 1));
    } else if (link.label === ">") {
      setPage((p) => Math.min(p + 1, pagination.last_page));
    } else if (!isNaN(Number(link.label))) {
      setPage(Number(link.label));
    }
  }

  return (
    <div className="mt-6 mx-auto py-2 flex flex-col items-center justify-center gap-2">
      <div className="w-full max-w-4xl">
        <Breadcrumb items={getAutoBreadcrumb()} className="" />
      </div>
      <div className="text-center w-full py-4 font-bold text-xl px-8 lg:px-0 ">
        <h1>
          {t("instructor.reviews")} ({pagination.total})
        </h1>
      </div>
      {/* Render paginated reviews */}
      {pagination.data.map(({ id, courseName, review, rating }) => (
        <Review
          key={id}
          courseName={courseName}
          review={review}
          rating={rating}
        />
        
      ))}

      {/* Pagination controls */}
      <div className="flex mt-4 rounded-lg shadow-sm">
        {pagination.links.map((link, idx) => (
          <button
            key={idx}
            disabled={
              (link.label === "<" && page === 1) ||
              (link.label === ">" && page === pagination.last_page)
            }
            onClick={() => handleClickPage(link)}
            className={`px-3 py-1 border ${
              link.active ? " text-black bg-gray-200" : "text-gray-400"
            } ${link.label === "<" && "rounded-l-md"} ${
              link.label === ">" && "rounded-r-md"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
