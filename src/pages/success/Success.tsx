import success from "../../assets/images/icons/success.svg";
import rocket from "../../assets/images/icons/rocket.svg";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Success = () => {
  // const breadcrumbItems=[
  //   {label:"Browse Courses",path:"/"},
  //   {label:"details Courses",path:"/"},
  //   {label:"payment",isActive:true}
  // ]
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="container mt-8">
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />

      <div className="w-[90%] lg:w-[50%] h-[90dvh] flex flex-col items-center justify-center gap-6 mx-auto text-center">
        <img
          src={success}
          alt="success"
          loading="lazy"
          className="w-40 lg:w-60 mb-6"
        />
        <h1 className="font-medium text-[20px] lg:text-[32px]">
          {t(
            "success.You have successfully subscribed to the course UI/UX Design"
          )}
        </h1>
        <p className="font-medium text-[15px] lg:text-[24px] text-secondary">
          {t("success.You Will Receive a confirmation email soon!")}{" "}
        </p>
        <div className="flex gap-3 items-center ">
          <img src={rocket} alt="rocket icon" loading="lazy" />
          <Link to="/" className="font-medium lg:text-[24px]">
            {t("success.Go to My Courses")}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Success;
