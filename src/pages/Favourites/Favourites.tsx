// src/pages/Favourites.tsx
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { useState } from "react";
import { useFavourites } from "@/hooks/Favorites/useFavourites";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import courseFav from "@/assets/images/course-fav.png";
import avtar from "@/assets/images/avatar-fav.png";
import useRemoveFavorites from "@/hooks/Favorites/useRemoveFavorites";
import { Link } from "react-router-dom";

export default function Favourites() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const [activeButton, setActiveButton] = useState<"btn1" | "btn2">("btn1");
  const { mutate: removeFavorite } = useRemoveFavorites();
  const { favourites, isLoading } = useFavourites();

  const isFavoriteCourse = (courseId: number) =>
    favourites.some((fav) => fav.course_id === courseId);

  const handleFavorite = (courseId: number) => {
    if (isFavoriteCourse(courseId)) {
      removeFavorite(courseId, {
        onSuccess: () => {
          toast.success(t("Removed Successfully"));
        },
      });
    }
  };

  return (
    <div className="bg-background container">
      <div className="ml-4">
        {/* The Stack pages */}
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />

        {/* Buttons */}
        <div
          className={`mb-4 flex font-semibold bg-[#F1F1F1] rounded-full w-fit ${
            favourites.length === 0 ? "hidden" : "flex"
          }`}>
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn1"
                ? "bg-[#72727242]"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn1")}>
            {t("favourite.Courses")}
          </button>
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn2"
                ? "bg-[#72727242]"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn2")}>
            {t("favourite.Instractor")}
          </button>
        </div>

        {/* Fav Cards */}
        {isLoading ? (
          <div className="mt-5 bg-border rounded-xl w-[95%] md:w-[60%] lg:w-[50%] flex flex-col gap-3 mr-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-4 py-3 animate-pulse">
                <div className="w-12 h-12 md:w-10 md:h-10 bg-gray-300 rounded-md"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : favourites.length > 0 ? (
          <div className="mt-5 bg-border rounded-xl w-[95%] md:w-[60%] lg:w-[50%] flex flex-col gap-1 mr-4">
            {favourites.map((fav, index) => (
              <div key={fav.id}>
                {index > 0 && (
                  <hr className="w-[95%] mx-auto h-[3px] bg-secondary opacity-30" />
                )}
                <div className="w-full flex items-center justify-between gap-4 px-4 py-2">
                  <img
                    src={activeButton === "btn1" ? courseFav : avtar}
                    alt="courseIcon"
                    loading="lazy"
                    className="w-6 h-6 object-contain md:w-8 md:h-8"
                  />

                  <Link
                    to={
                      activeButton === "btn1"
                        ? `/courses/${fav.course_id}`
                        : `/${fav.user_id}/instructor-details`
                    }>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm md:text-base">
                        {activeButton === "btn1"
                          ? fav.course.title
                          : fav.course.user.name}
                      </h3>
                      <h3 className="text-secondaryDark text-xs md:text-sm">
                        {activeButton === "btn1"
                          ? fav.course.user.name
                          : fav.course.title}
                      </h3>
                    </div>
                  </Link>

                  <Heart
                    fill="red"
                    color="red"
                    onClick={(e) => {
                      handleFavorite(fav.course.id);
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="w-5 h-5 md:w-6 md:h-6 cursor-pointer mr-4 rtl:ml-4"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-[95%] md:w-[60%] lg:w-[50%] mx-auto mt-10 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center shadow-sm">
            <h1 className="text-base md:text-lg font-semibold">
              {t("favourite.No Favourites have been selected") ||
                "No favourites selected yet"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
