import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Edit,
  Facebook,
  Linkedin,
  Youtube,
  Star,
  Users,
  MapPin,
  Mail,
} from "lucide-react";
import instructors from "@/data/instructors";
import type { InstructorData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InstructorCard({
  instructorData,
}: {
  instructorData: InstructorData;
}) {
  const { t } = useTranslation();
  const instructor = instructorData || instructors[0];
  const navigate = useNavigate();

  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 mb-8">
      {/* Background Pattern */}
      <div className="relative">
        {/* Mobile Image Header - Shows only on mobile */}
        <div className="flex lg:hidden justify-center mb-6">
          <div className="relative">
            {instructor.image ? (
              <img
                src={instructor.image}
                alt={`${instructor.first_name} ${instructor.last_name}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-xl font-bold shadow-lg border-4 border-white">
                {instructor.first_name?.charAt(0) || "I"}
              </div>
            )}

            {/* Online Status Indicator */}
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1"
                >
                  {t("common.instructor")}
                </Badge>
                {instructor.status && (
                  <Badge
                    variant="default"
                    className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1"
                  >
                    {instructor.status}
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
                {instructor.first_name} {instructor.last_name}
              </h2>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <span className="text-sm">{instructor.email}</span>
              </div>
              {instructor.nationality && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-green-500" />
                  <span className="text-sm">{instructor.nationality}</span>
                </div>
              )}
            </div>

            {/* Bio Section */}
            {instructor.bio && (
              <div className=" flex items-center gap-1 ">
                <h3 className="text-sm font-semibold text-gray-900">
                  {t("profile.Bio")}:
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>
            )}

            {/* About Section */}
            {instructor.about && (
              <div className="flex  gap-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  {t("profile.About")}:
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {instructor.about}
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {instructor.twitter_link && (
                <Link
                  to={instructor.twitter_link}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors duration-200 group"
                  title="Twitter/X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16"
                    height="16"
                    className="group-hover:scale-110 transition-transform"
                  >
                    <path d="M17.53 3H21L13.91 10.93L22 21H15.97L11.03 14.68L5.56 21H2L9.57 12.52L2 3h6.18l4.48 5.86L17.53 3ZM16.36 19h1.43l-7.19-9.18l-.01-.02l-1.32-1.68H7.84l7.19 9.18l1.33 1.7Z" />
                  </svg>
                </Link>
              )}
              {instructor.linkedin_link && (
                <Link
                  to={instructor.linkedin_link}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 group"
                  title="LinkedIn"
                >
                  <Linkedin
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              )}
              {instructor.youtube_link && (
                <Link
                  to={instructor.youtube_link}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 group"
                  title="YouTube"
                >
                  <Youtube
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              )}
              {instructor.facebook_link && (
                <Link
                  to={instructor.facebook_link}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors duration-200 group"
                  title="Facebook"
                >
                  <Facebook
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <Users size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
                    {t("instructor.Total Students")}
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    {instructor.total_students || 0}
                  </p>
                </div>
              </div>

              <div className="cursor-pointer flex items-center gap-3 bg-yellow-50 px-4 py-2 rounded-lg" onClick={()=>navigate("/instructor/reviews")}>
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                  <Star size={16} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">
                    {t("instructor.reviews")}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-bold text-yellow-700">
                      {instructor.average_rating || 0}
                    </p>
                    <span className="text-sm text-yellow-600">
                      ({instructor.total_reviews || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col items-center gap-4 lg:min-w-[140px]">
            {/* Profile Image */}
            <div className="relative">
              {instructor.image ? (
                <img
                  src={instructor.image}
                  alt={`${instructor.first_name} ${instructor.last_name}`}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-3xl font-bold shadow-lg border-4 border-white">
                  {instructor.first_name?.charAt(0) || "I"}
                </div>
              )}

              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>

            {/* Edit Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
            >
              <Link
                to="/instructor/profile"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2"
              >
                <Edit size={16} />
                <span className="text-sm">{t("profile.Edit Profile")}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Edit Button - Shows only on mobile */}
        <div className="flex lg:hidden justify-center mt-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
          >
            <Link
              to="/instructor/profile"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              <span className="text-sm">{t("profile.Edit Profile")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
