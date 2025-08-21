import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { useState } from "react";
import { useFavourites } from "@/hooks/useFavourites";
import heart from "../../assets/images/icons/fav-heart.png";

export default function Favourites() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const [activeButton, setActiveButton] = useState<"btn1" | "btn2">("btn1");

  // ✅ استخدم الهُوك بتاعك
  const { favourites, loading } = useFavourites();

  return (
    <div className="bg-background container">
      <div className="ml-4">
        {/* The Stack pages */}
        <div>
          <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
        </div>

        {/* Buttons */}
        <div className={`mb-4 flex font-semibold bg-[#F1F1F1] rounded-full w-fit ${favourites.length === 0 ? "hidden" : "flex"}`}>
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn1"
                ? "bg-[#72727242]"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn1")}
          >
            {t("favourite.Courses")}
          </button>
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn2"
                ? "bg-[#72727242]"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn2")}
          >
            {t("favourite.Instractor")}
          </button>
        </div>

        {/* Fav Cards */}
        {loading ? (
          <h1 className="text-lg w-full text-gray-500">{t("adminUser.Loading")}</h1>
        ) : favourites.length > 0 ? (
          <div className="mt-5 bg-border rounded-xl w-[95%] md:w-[50%] lg:w-[35%] flex flex-col gap-1 mr-4">
            {favourites.map((fav, index) => (
              <div key={fav.id}>
                {index > 0 && (
                  <hr className="w-[90%] mx-auto h-[3px] bg-secondary opacity-30" />
                )}

                <div className="w-full flex items-center justify-between gap-4 px-4 py-2">
                  <img
                    src={heart} 
                    alt="courseIcon"
                    loading="lazy"
                    className="w-6 h-6 object-contain md:w-10 md:h-10"
                  />

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-md md:text-lg">
                      {activeButton === "btn1"
                        ? fav.course.title
                        : fav.course.user_id} 
                    </h3>
                    <h3 className="text-secondaryDark text-xs md:text-sm">
                      {activeButton === "btn1"
                        ? fav.course.user_id
                        : fav.course.title}
                    </h3>
                  </div>

                  <img
                    src={heart}
                    alt="favourite"
                    loading="lazy"
                    className="w-4 h-4 cursor-pointer mr-4 rtl:ml-4 md:w-6 md:h-6"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="mr-auto text-lg w-full text-red-800">
            {t("favourite.No Favourites have been selected")}
          </h1>
        )}
      </div>
    </div>
  );
}
