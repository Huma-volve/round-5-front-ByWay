import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { FAVOURITE_DETAILES , type FavouriteItem } from "../../data/FavouritesDetailes";
import { useState } from "react";
import heart from "../../assets/images/icons/fav-heart.png";

export default function Favourites() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const [activeButton, setActiveButton] = useState<"btn1" | "btn2">("btn1");
  return (
    <div className="bg-background container ">
      <div className="ml-4">
        {/* The Stack pages */}
        <div>
          <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
        </div>
        {/* Buttons */}
        <div className="mb-4 flex font-semibold bg-gray-100 rounded-full w-fit">
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn1"
                ? "bg-secondary"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn1")}>
            {t("Courses")}
          </button>
          <button
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeButton === "btn2"
                ? "bg-secondary"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveButton("btn2")}>
            {t("Instructor")}
          </button>
        </div>
        {/* Fav Cards */}
        {FAVOURITE_DETAILES.length > 0 ? (
          <div className="mt-5 bg-border rounded-xl w-[95%] md:w-[50%] lg:w-[35%] flex flex-col gap-1 mr-4">
            {FAVOURITE_DETAILES.map((fav : FavouriteItem, index) => (
              <div key={fav.id}>
                {index > 0 && (
                  <hr className="w-[90%] mx-auto h-[3px] bg-secondary opacity-30" />
                )}

                <div className="w-full flex items-center gap-4 px-4 py-2">
                  <img
                    src={fav.image}
                    alt="courseIcon"
                    loading="lazy"
                    className="w-6 h-6 object-contain md:w-10 md:h-10"
                  />

                  <div className="flex flex-col">
                    <h3 className="font-semibold text-md md:text-lg">
                      {activeButton === "btn1"
                        ? fav.courseName
                        : fav.instractor}
                    </h3>
                    <h3 className="text-secondaryDark text-xs md:text-sm">
                      {activeButton === "btn1"
                        ? fav.instractor
                        : fav.courseName}
                    </h3>
                  </div>

                  <img
                    src={heart}
                    alt="favourite"
                    loading="lazy"
                    className="w-4 h-4 ml-auto cursor-pointer mr-4 md:w-6 md:h-6"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="mr-auto text-lg w-full text-red-800">
            No Favourites have been selected
          </h1>
        )}
      </div>
    </div>
  );
}
