import CourseCard from "@/components/course/CourseCard/CourseCard";
import { Button } from "@/components/ui/button";
import RatingsOverview from "@/components/instructor/reviews/RatingsOverview";
import InstructorCard from "@/components/instructor/InstructorCard/InstructorCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NoCourses from "@/components/instructor/empty/NoCourses";
import NoReviews from "@/components/instructor/empty/NoReviews";
import { useInstructor } from "@/api/useInstructor";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import Review from "@/components/learnerCourses/ReviewLeanerCourses";
import InstructorDataSkelton from "@/components/instructor/InstructorCard/InstructorDataSkelton";
import type { Course } from "@/types/Course";
import type { ReviewsAndRatings } from "@/lib/types";
import LoadingCourses from "@/components/course/CourseCard/LoadingCourses";
import ReviewSkeleton from "@/components/instructor/reviews/ReviewSkeleton";
import RatingsOverviewSkeleton from "@/components/instructor/reviews/RatingsOverviewSkeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

// Extend the ReviewsAndRatings type for instructor review data
interface InstructorReview
  extends Omit<ReviewsAndRatings, "course_name" | "course"> {
  reviewer_image?: string;
  course?: string;
}
export default function Instructor() {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch } = useInstructor();
  const [, setInstructorImage] = useLocalStorage(
    "instructor_image",
    data?.image || ""
  );
  useEffect(() => {
    if (data?.image) {
      setInstructorImage(data.image);
    }
  }, [data?.image, setInstructorImage]);

  console.log("instructor data", data);

  const instructorData = {
    id: data?.id,
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    about: data?.about,
    bio: data?.bio,
    twitter_link: data?.twitter_link,
    linkedin_link: data?.linkedin_link,
    youtube_link: data?.youtube_link,
    facebook_link: data?.facebook_link,
    role: data?.role,
    status: data?.status,
    nationality: data?.nationality,
    image: data?.image,
    total_reviews: data?.total_reviews,
    average_rating: data?.average_rating,
    total_students: data?.total_students,
  };

  const ratingOverviewData = {
    average_rating: data?.average_rating || 0,
    total_reviews: data?.total_reviews || 0,
    rating_distribution: {
      ...data?.rating_distribution,
    },
  };

  // breadcrumb items
  const breadcrumbItems = [
    { label: "common.home", link: "/" },
    { label: "instructor.profile" },
  ];

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <main className="container py-12">
        <ErrorState
          message="Failed to load instructor profile. Please try again."
          onRetry={handleRetry}
        />
      </main>
    );
  }

  return (
    <main className="container ">
      <NewBreadCrumb items={breadcrumbItems} />
      <section className="space-y-3">
        {isLoading ? (
          <InstructorDataSkelton />
        ) : (
          <InstructorCard instructorData={instructorData} />
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-semibold">
            {t("instructor.yourCourses")}
          </h2>
          <Button asChild variant="default" size="sm" className="text-white">
            <Link to="/instructor/my-courses">{t("common.seeAll")}</Link>
          </Button>
        </div>

        {isLoading ? (
          <LoadingCourses />
        ) : data?.courses && data.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.courses.map((course: Course) => (
              <CourseCard
                key={course.id}
                course={course}
                id={String(course.id)}
                variant="instructor"
              />
            ))}
          </div>
        ) : (
          <NoCourses />
        )}
      </section>
      {isLoading ? (
        <div className="flex flex-col md:flex-row gap-4">
          <RatingsOverviewSkeleton />
          <ReviewSkeleton />
        </div>
      ) : data?.reviews && data.reviews.length > 0 ? (
        <section className="space-y-3 px-4 sm:px-6">
          <h2 className="text-xl lg:text-2xl font-semibold">
            {t("profile.Learner Reviews")}
          </h2>

          <div className="md:grid lg:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <RatingsOverview ratingOverviewData={ratingOverviewData} />
            </div>
            <div className="md:col-span-2">
              <div className="mb-9 space-y-4">
                {data.reviews.map((reviewData: InstructorReview) => (
                  <Review
                    key={reviewData.id}
                    variant="user"
                    name={reviewData.reviewer || "Anonymous"}
                    rating={reviewData.rating}
                    date={reviewData.date || "2025-08-24"}
                    review={reviewData.comment}
                    imageLearner={reviewData.reviewer_image}
                    courseName={reviewData.course || "Course Name"}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <Link to="/instructor/reviews">
                  <Button className="bg-white text-black hover:bg-revenue2Bg transition duration-300">
                    {t("profile.View more Reviews")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NoReviews />
      )}
    </main>
  );
}
