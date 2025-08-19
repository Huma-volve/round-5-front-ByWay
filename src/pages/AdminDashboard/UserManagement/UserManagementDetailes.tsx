import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoadingDesign from "@/components/AdminDashboard/UserManagement/LoadingDesign";
import ErrorDesign from "@/components/AdminDashboard/UserManagement/ErrorDesign";
import { useFetchUserProfileDashboard } from "@/hooks/AdminDashboard/useFetchUserProfile";

export default function UserManagementDetailes() {
  const { userId } = useParams();
  const { t } = useTranslation();
  const id = userId ? parseInt(userId) : 0;
  console.log("the id = ",userId);
  const { data: user, error, isLoading, isError } = useFetchUserProfileDashboard(id);
  console.log("user ===>", user); 

  if (isLoading) return <LoadingDesign />;
  if (isError) return <ErrorDesign message={error?.message} />;
  if (!user) return <div className="p-6 text-gray-500">{t("adminUser.No users found")}</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2 w-full mt-12 mb-8">
        <h1 className="md:text-3xl text-[#2C4E80] font-bold">
          {t("adminUserDetails.User Profile")}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {t("adminUserDetails.View detailed information about this user")}
        </p>
      </div>

      {/** User Info (common fields for all roles) */}
<div className="bg-white shadow-sm border rounded-lg p-6 grid md:grid-cols-2 gap-6">
  {/* Name */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Full Name")}</p>
    <p className="text-base font-medium text-gray-800">{user.name}</p>
  </div>

  {/* Email */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Email Address")}</p>
    <p className="text-base font-medium text-indigo-600">{user.email}</p>
  </div>

  {/* Role */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Role")}</p>
    <p className="text-base font-medium text-gray-800">{user.role}</p>
  </div>

  {/* Status */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Status")}</p>
    <p
      className={`text-base font-medium ${
        user.status === "Active" ? "text-green-600" : "text-red-600"
      }`}
    >
      {user.status}
    </p>
  </div>

  {/* Nationality */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Nationality")}</p>
    <p className="text-base font-medium text-gray-800">{user.nationality ?? "not found"}</p>
  </div>

  {/* Registration Date */}
  <div>
    <p className="text-sm text-gray-500">{t("adminUserDetails.Registration Date")}</p>
    <p className="text-base font-medium text-gray-800">
      {user.created_at.slice(0, 10)}
    </p>
  </div>

  {/** Instructor-specific fields */}
  {user.role === "instructor" && (
    <>
      {user.course_count !== undefined && (
        <div>
          <p className="text-sm text-gray-500">{t("adminUserDetails.Total Courses")}</p>
          <p className="text-base font-medium text-gray-800">{user.course_count}</p>
        </div>
      )}

      {user.average_rating !== undefined && (
        <div>
          <p className="text-sm text-gray-500">{t("adminUserDetails.Average Rating")}</p>
          <p className="text-base font-medium text-gray-800">
            ⭐ {user.average_rating} / 5
          </p>
        </div>
      )}

      {user.total_earnings && (
        <div>
          <p className="text-sm text-gray-500">{t("adminUserDetails.Total Earnings")}</p>
          <p className="text-base font-medium text-gray-800">{user.total_earnings}</p>
        </div>
      )}
    </>
  )}
</div>

{/* Bio Section (Instructor only) */}
{user.role === "instructor" && user.bio && (
  <div className="bg-white shadow-sm border rounded-lg p-6 mt-6">
    <h2 className="text-lg font-semibold text-[#2C4E80] mb-2">
      {t("adminUserDetails.About Instructor")}
    </h2>
    <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
  </div>
)}


      {/* Bio Section (Instructor only) */}
      {user.role === "instructor" && user.bio && (
        <div className="bg-white shadow-sm border rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-[#2C4E80] mb-2">
            {t("adminUserDetails.About Instructor")}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
        </div>
      )}
    </div>
  );
}
