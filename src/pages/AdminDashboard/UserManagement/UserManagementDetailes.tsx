import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserManagementDetailes() {
  const { id } = useParams();
  const { t } = useTranslation();

  // fake data
  const user = {
    id,
    name: "Mohamed Ahmed",
    email: "mohamed@example.com",
    role: "Instructor",
    status: "Active",
    nationality: "Egyptian",
    registrationDate: "2023-05-12",
    totalCourses: 12,
    averageRating: 4.6,
    totalEarnings: "15,000 EGP",
    bio: "Experienced web development instructor with 5+ years of teaching React, Node.js, and modern web technologies.",
  };

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

      {/* User Info */}
      <div className="bg-white shadow-sm border rounded-lg p-6 grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Full Name")}
          </p>
          <p className="text-base font-medium text-gray-800">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Email Address")}
          </p>
          <p className="text-base font-medium text-indigo-600">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("adminUserDetails.Role")}</p>
          <p className="text-base font-medium text-gray-800">{user.role}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Status")}
          </p>
          <p
            className={`text-base font-medium ${
              user.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.status}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Nationality")}
          </p>
          <p className="text-base font-medium text-gray-800">
            {user.nationality}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Registration Date")}
          </p>
          <p className="text-base font-medium text-gray-800">
            {user.registrationDate}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Total Courses")}
          </p>
          <p className="text-base font-medium text-gray-800">
            {user.totalCourses}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Average Rating")}
          </p>
          <p className="text-base font-medium text-gray-800">
            ⭐ {user.averageRating} / 5
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {t("adminUserDetails.Total Earnings")}
          </p>
          <p className="text-base font-medium text-gray-800">
            {user.totalEarnings}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white shadow-sm border rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-[#2C4E80] mb-2">
          {t("adminUserDetails.About Instructor")}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
      </div>
    </div>
  );
}
