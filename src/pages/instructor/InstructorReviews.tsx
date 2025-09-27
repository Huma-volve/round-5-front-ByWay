import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useBreadcrumb } from "../../hooks/useBreadcrumb";
// import type { InstructorReview } from "../../data/instructorReviewsData";
// import type { LaravelPagination } from "../../utils/paginationSimulator";

// import Breadcrumb from "../../components/common/Breadcrumb";
import NewBreadCrumb from "../../components/common/NewBreadCrumb";
// import { paginateLaravel } from "../../utils/paginationSimulator";
// import INSTRUCTOR_REVIEWS_DATA from "../../data/instructorReviewsData";
import PaginationBar from "@/components/common/PaginationBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useInstructorReviews from "@/hooks/instructor/useInstructorReviews";
import Review from "@/components/learnerCourses/ReviewLeanerCourses";
import NoReviews from "@/components/instructor/empty/NoReviews";
import ReviewSkeleton from "@/components/instructor/reviews/ReviewSkeleton";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import type { AxiosError } from "axios";

export interface ReviewData {
  id: number;
  date: string;
  reviewer_image?: string;
  reviewer: string;
  rating: number;
  comment: string;
  course_name?: string;
}

export default function InstructorReviews() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [localPage, setLocalPage] = useLocalStorage<number>(
    "instructor_reviews_page",
    1
  );
  const { data, isLoading, error, isError } = useInstructorReviews(page);
  const reviews = data?.data.reviews.data || [];
  console.log(reviews);
  const pagination = {
    current_page: data?.data.reviews.current_page,
    last_page: data?.data.reviews.last_page,
  };
  useEffect(() => {
    setPage(localPage);
  }, [localPage]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLocalPage(newPage);
  };
  const breadcrumbItems = useMemo(
    () => [
      { label: "common.home", link: "/" },
      { label: "instructor.profile", link: "/instructor" },
      { label: "instructor.reviews" },
    ],
    []
  );

  let content = <NoReviews />;

  if (isLoading) {
    content = (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <ReviewSkeleton key={index} />
        ))}
      </>
    );
  }

  if (isError) {
    const AxiosErrorMessage = error as AxiosError<{ message?: string }>;
    content = <ErrorState message={AxiosErrorMessage.message} />;
  }

  if (reviews.length > 0) {
    console.log("reviews", reviews);
    content = reviews.map((review: ReviewData) => (
      <Review
        key={review.id}
        date={review.date}
        name={review.reviewer}
        rating={review.rating}
        review={review.comment}
        variant="course"
        courseName={review.course_name || "Course Name"}
        imageLearner={review.reviewer_image}
      />
    ));
  }

  return (
    <div className="py-2 flex flex-col items-center justify-center gap-2 container">
      <div className="w-full ">
        {/* <Breadcrumb items={getAutoBreadcrumb()} className="" /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>
      <div className="text-center w-full pb-4 font-bold text-xl px-8 lg:px-0 ">
        <h1>
          {t("instructor.reviews")} ({reviews.length || 0})
        </h1>
      </div>
      {/* Render paginated reviews */}
      <section className="w-full mx-auto flex flex-col justify-center items-center">{content}</section>

      {/* Pagination controls */}
      {!isLoading && reviews.length > 0 && (
        <section className="flex justify-center">
          <PaginationBar
            currentPage={pagination?.current_page}
            totalPages={pagination?.last_page}
            handlePageChange={handlePageChange}
          />
        </section>
      )}
    </div>
  );
}
