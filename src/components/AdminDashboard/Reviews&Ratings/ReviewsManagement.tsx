import { useState } from "react";
import actionMenu from "@/assets/images/icons/menu-admin-action.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IconStar from "@/assets/images/icons/star-active-icon.svg";
import ViewReview from "./ViewReview";
import DeleteReview from "./DeleteReview";
import useFetchReviews from "@/hooks/AdminDashboard/Reviews&Ratings/useFetchReviews";
import { Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ReviewsManagement() {
  const { t } = useTranslation();
  const { data: reviews, error, isLoading } = useFetchReviews();
  const [openRow, setOpenRow] = useState<number | string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const currentReviews = Array.isArray(reviews) ? reviews.slice(startIndex, startIndex + pageSize) : [];
  const totalPages = Array.isArray(reviews) ? Math.ceil(reviews.length / pageSize) : 0;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading reviews
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* header */}
      <div className="flex flex-col gap-2 w-full mt-12">
        <h1 className="md:text-3xl text-[#2C4E80] font-bold">
          {t("adminReviews.reviews_ratings")}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {t("adminReviews.manage_feedback")}
        </p>
      </div>

      {/* table */}
      <div className="w-full mt-8 mb-12 overflow-x-auto rounded-lg shadow-sm border border-gray-200 relative">
        <table className="w-full min-w-[700px] table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left rtl:text-right text-sm text-[#2C4E80]">
              <th className="px-4 py-3">{t("adminReviews.course_name")}</th>
              <th className="px-4 py-3">{t("adminReviews.reviewer")}</th>
              <th className="px-4 py-3">{t("adminReviews.rating")}</th>
              <th className="px-4 py-3">{t("adminReviews.comment_preview")}</th>
              <th className="px-4 py-3">{t("adminReviews.date")}</th>
              <th className="px-4 py-3">{t("adminReviews.status")}</th>
              <th className="px-4 py-3">{t("adminReviews.actions")}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentReviews?.map((review, index) => {
              const isLastThree = index >= currentReviews.length - 3;
              return (
                <tr
                  key={review.id}
                  className="bg-white text-left rtl:text-right hover:bg-gray-50 transition-colors relative"
                >
                  <td className="px-4 py-3 text-gray-800 text-sm truncate max-w-[200px]">
                    {review.course_name}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-sm">
                    {review.reviewer}
                  </td>
                  <td className="px-4 py-6 flex items-center text-gray-800 text-sm">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <img
                        className="max-w-sm"
                        key={i}
                        src={IconStar}
                        alt="review star"
                      />
                    ))}
                  </td>
                  <td className="px-4 py-3 text-sm truncate max-w-[200px]">
                    {review.comment}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {review.date}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${
                      review.status === "Reported"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {review.status}
                  </td>
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() =>
                        setOpenRow(openRow === review.id ? "" : review.id)
                      }
                      className="p-1 hover:bg-gray-100 rounded-full transition relative z-10"
                    >
                      <img
                        src={actionMenu}
                        alt="action menu"
                        className="bg-blue-50 w-8 rounded-full p-2 text-xs"
                      />
                    </button>

                    {/* Dropdown menu */}
                    {openRow === review.id && (
                      <div
                        className={`absolute z-50 bg-white shadow-lg border rounded-md w-44 
                                    ${
                                      isLastThree
                                        ? "bottom-full mb-2"
                                        : "top-full mt-2"
                                    } 
                                    right-0`}
                      >
                        <ul className="flex flex-col text-sm">
                          <li
                            onClick={() => {
                              setSelectedReviewId(review.id);
                              setOpen(true);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          >
                            {t("adminReviews.view_full_review")}
                          </li>
                          <li
                            onClick={() => {
                              setShowConfirm(true);
                              setSelectedReviewId(review.id);
                            }}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            {t("adminReviews.delete_review")}
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                            <Link to="/admin/analytics">
                              {t("adminReviews.report")}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination className="mt-6 flex justify-center">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className="text-gray-600 hover:text-gray-800"
              />
            </PaginationItem>

            {/* First page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(1);
                }}
                className={`${
                  currentPage === 1
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                } border border-gray-300 rounded-md px-3 py-1 transition-colors`}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Ellipsis before (only show if more than one page is skipped) */}
            {currentPage > 4 && totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis className="text-gray-600" />
              </PaginationItem>
            )}

            {/* Nearby pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page !== 1 &&
                  page !== totalPages &&
                  page >= currentPage - 2 &&
                  page <= currentPage + 2
              )
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    className={`${
                      currentPage === page
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    } border border-gray-300 rounded-md px-3 py-1 transition-colors`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Ellipsis after (only show if more than one page is skipped) */}
            {currentPage < totalPages - 3 && totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis className="text-gray-600" />
              </PaginationItem>
            )}

            {/* Last page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                  className={`${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } border border-gray-300 rounded-md px-3 py-1 transition-colors`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className="text-gray-600 hover:text-gray-800"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <ViewReview
          open={open}
          onOpenChange={setOpen}
          reviewId={selectedReviewId}
        />
      </div>
      <DeleteReview
        open={showConfirm}
        onOpenChange={setShowConfirm}
        reviewId={selectedReviewId}
      />
    </div>
  );
}
