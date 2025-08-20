import { useState } from "react";
import searchIcon from "@/assets/images/icons/search-admin.png";
import actionMenu from "@/assets/images/icons/menu-admin-action.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import IconStar from "@/assets/images/icons/star-active-icon.svg";
import ViewReview from "./ViewReview";
import { fakeReviews } from "@/data/AdminDashboard/ReviewsManagement";
import DeleteReview from "./DeleteReview";

export default function ReviewsManagement() {
  const { t } = useTranslation();
  const [openRow, setOpenRow] = useState<number | string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);

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
            {fakeReviews.map((review, index) => {
              const isLastThree = index >= fakeReviews.length - 3;
              return (
                <tr
                  key={review.id}
                  className="bg-white text-left rtl:text-right hover:bg-gray-50 transition-colors relative"
                >
                  <td className="px-4 py-3 text-gray-800 text-sm">
                    {review.courseName}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-sm">
                    {review.reviewer}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-sm">
                    <img src={IconStar} alt="review star" />
                  </td>
                  <td className="px-4 py-3 text-sm">{review.commentPreview}</td>

                  <td className="px-4 py-3 text-sm text-gray-700">
                    {review.date}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${
                      review.status === "Blocked"
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
                            onClick={() => setOpen(true)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          >
                            {t("adminReviews.view_full_review")}
                          </li>
                          <li
                            onClick={() => setShowConfirm(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            {t("adminReviews.delete_review")}
                          </li>
                          <Link to="/admin/analytics">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                              {t("adminReviews.report")}
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ViewReview open={open} onOpenChange={setOpen} />
      </div>
      <DeleteReview open={showConfirm} onOpenChange={setShowConfirm} />
    </div>
  );
}
