import { Link, useNavigate } from "react-router-dom";
import StarIcon from "../../assets/images/icons/StarIcon.svg";
import { useTranslation } from "react-i18next";
import { Heart, Loader2 } from "lucide-react";
import ImgProduct from "../../assets/images/ui-product.png";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CoursesHome } from "@/lib/types";
import { useFavourites } from "@/hooks/Favorites/useFavourites";
import useAddFavorites from "@/hooks/Favorites/useAddFavorites";
import useRemoveFavorites from "@/hooks/Favorites/useRemoveFavorites";
import useAddToCart from "@/hooks/Cart/useAddToCart";

interface CardCourseProps {
  courses: CoursesHome[];
  error: boolean;
  isLoading: boolean;
}
function CardCourse({ courses, error, isLoading }: CardCourseProps) {
  const { t } = useTranslation();
  const [role] = useLocalStorage("role", "");
  const { favourites } = useFavourites();
  const { mutate: removeFavorite } = useRemoveFavorites();
  const { mutate: addFavorite } = useAddFavorites();
  const { mutate: addToCart } = useAddToCart();
  const navigate = useNavigate();
  // Check courseId Favorite
  const isFavoriteCourse = (courseId: number) =>
    favourites.some((fav) => fav.course_id === courseId);

  // handleFavorite
  const handleFavorite = (courseId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavoriteCourse(courseId)) {
      removeFavorite(courseId);
    } else {
      addFavorite(courseId);
    }
  };

  // handleAddToCart
  const handleAddToCart = (courseId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(courseId);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading reviews
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
      {courses.map((course) => (
        <div
          onClick={() => {
            navigate(
              `${
                role === "instructor"
                  ? `/instructor/course-details/${course.id}`
                  : `/courses/${course.id}`
              }`
            );
          }}
          key={course.id}
          className="cursor-pointer"
        >
          <div className="mb-20 relative">
            <div className="relative">
              <img
                className="w-full border border-[--category] rounded-2xl"
                src={course?.image_url || ImgProduct}
                alt={course.title}
                loading="lazy"
              />
            </div>
            <Heart
              onClick={(e) => {
                handleFavorite(course.id, e);
              }}
              className={`absolute -top-1 -left-1 w-8 h-8 p-1 
              rounded-full cursor-pointer shadow transition
              ${
                isFavoriteCourse(course.id)
                  ? "bg-red-800 text-white"
                  : "bg-white text-red-500 hover:bg-red-800 hover:text-white"
              }`}
              fill={isFavoriteCourse(course.id) ? "currentColor" : "none"}
            />
            <div className="border-2 w-full border-[--category] rounded-2xl mt-3 px-4 py-3 shadow">
              <h5 className="font-[600] text-lg lg:text-lg xl:text-xl truncate">
                {course.title}
              </h5>
              {course.user ? (
                <Link
                  to={`/${course.user?.id}/instructor-details`}
                  className="block text-sm my-2 text-[--secondary-dark] hover:text-blue-500 cursor-pointer"
                >
                  {t("common.by")} {course.user?.name}
                </Link>
              ) : (
                <div className="my-2"></div>
              )}

              <div className="flex items-center">
                {Array.from({ length: Number(course.rating) || 1 }).map(
                  (_, index) => (
                    <img key={index} src={StarIcon} alt="Ratings" />
                  )
                )}
                <span className="lg:text-md text-sm font-[600] ml-2">
                  ({500} {t("common.ratings")})
                </span>
              </div>
              <p className="text-md my-4 truncate">{course.description}</p>
              <div className="flex justify-between text-md flex-col md:flex-row items-center font-[600]">
                <h4 className="mb-5 lg:mb-0">{course.price} EGP</h4>
                <button
                  onClick={(e) => handleAddToCart(course.id, e)}
                  className="bg-[--success] py-1 px-2 rounded-lg text-white hover:bg-green-700 transition"
                >
                  {t("common.addToCart")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardCourse;
