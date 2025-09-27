// import Breadcrumb from "@/components/common/Breadcrumb";
import CardCourse from "@/components/learnerCourses/CardCourse";
import useInstructorDetails from "@/hooks/LearnerCourses/useInstructorDetails";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { CircleUser, Loader2 } from "lucide-react";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReviewLeanerCourses from "@/components/learnerCourses/ReviewLeanerCourses";
import ErrorState from "@/components/course/CourseCard/ErrorState";
import type { AxiosError } from "axios";

function InstructorDetails() {
  const { t } = useTranslation();
  const { instructorId } = useParams();
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const { instructor, error:initError, isLoading ,isError} = useInstructorDetails(instructorId!);
  const error = initError as AxiosError<{ message?: string }>;
  const breadcrumbItems = useMemo(
    () => [
      { label: "common.home", link: "/" },
      {
        label:
          instructor?.first_name && instructor?.last_name
            ? `Instructor ${instructor.first_name} ${instructor.last_name}`
            : "Instructor Details",
      },
    ],
    [instructor?.first_name, instructor?.last_name]
  );
  const courses = instructor?.courses;
  if (!instructorId) {
    return (
      <div className="flex items-center justify-center h-screen">
        Instructor ID not provided
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorState message={error?.message || "Something went wrong"} />               
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="my-5">
        {/* <Breadcrumb items={getAutoBreadcrumb()} /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>
      <div className="">
        <div>
          <div className="flex items-center flex-wrap md:justify-start justify-center gap-2 my-3">
            {instructor?.image ? (
              <img
                src={instructor.image}
                alt={instructor.first_name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <CircleUser size={100} />
            )}
            <h3 className="font-[500] capitalize text-2xl">
              {instructor?.first_name && instructor?.last_name
                ? ` ${instructor.first_name} ${instructor.last_name}`
                : "Instructor Name"}
            </h3>
          </div>

          <div>
            {instructor?.statistics && (
              <div className="my-10 flex items-center flex-wrap md:justify-start justify-center gap-10 md:gap-40">
                {instructor?.statistics?.total_students && (
                  <div className="text-center">
                    <p className="font-[600] text-xl mb-1">
                      {instructor?.statistics?.total_students || "0"}+
                      </p>
                      <p>
                        {t("common.numberOf")} {t("common.students")}
                      </p>
                    </div>
                  )}
                  {instructor?.statistics?.average_rating && (
                    <div className="text-center">
                      <p className="font-[600] text-xl mb-1">
                        {instructor?.statistics?.average_rating || "0"}/5
                      </p>
                      <p>
                        {t("common.average_rating")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            <div>
              {instructor?.about && (
                <>
                  <p className="font-[600] text-xl">{t("common.aboutMe")}</p>
                  <p className="my-2 border-b border-gray-300">
                    {instructor?.about || "instructor about"}
                  </p>
                  <p className="my-5">{instructor?.bio || "instructor bio"}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="text-lg font-[600]">{t("common.myCourses")}</p>
        <div className="grid my-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-center">
          <CardCourse
            courses={courses || []}
            error={error}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
        {Array.isArray(instructor?.reviews) && instructor?.reviews.length > 0 &&
          instructor?.reviews.map((review, index) => (
            <ReviewLeanerCourses
              key={index}
              variant="user"
              name={review?.reviewer}
              review={review?.comment}
              rating={review?.rating}
              date={review?.date}
              imageLearner={review?.user_image}
            />
          ))}
      </div>
    </>
  );
}

export default InstructorDetails;
