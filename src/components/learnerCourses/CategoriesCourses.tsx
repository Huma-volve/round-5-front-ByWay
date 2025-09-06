import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetchCategoriesCourses from "@/hooks/LearnerCourses/useFetchCategoriesCourses";
import ImgNotFound from "@/assets/images/image-not-found.png";

function CategoriesCourses() {
  const { t } = useTranslation();
  const { data: categoriesCourses } = useFetchCategoriesCourses();
  console.log(categoriesCourses);
  return (
    <div className="mx-10 mt-12">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-semibold">{t("common.topCategories")}</h3>
        <Link to="/categories" className="text-[var(--category-icon)] text-sm">
          {t("common.seeAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {categoriesCourses?.map(
          (category: {
            id: number;
            name: string;
            courses_count: number;
            icon: string;
          }) => (
            <div
              key={category.id}
              className="flex flex-col cursor-pointer border border-[--category] items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 w-full"
            >
              <div className="border rounded-full p-7 bg-[--category]">
                <img src={category.icon || ImgNotFound} alt={category.name} loading="lazy" onError={(e)=> e.currentTarget.src =ImgNotFound} className="w-14 rounded-full"/>
              </div>
              <h4 className="my-2">{category.name}</h4>
              <p>
                {category.courses_count} {t("common.courses")}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CategoriesCourses;
