import success from "../../assets/images/icons/success.svg";
import rocket from "../../assets/images/icons/rocket.svg";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
const Success = () => {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  return (
    <div className="container mt-8">
      <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      <div className="w-[90%] lg:w-[50%] h-[70dvh] flex flex-col items-center justify-center gap-6 mx-auto text-center">
        <img
          src={success}
          alt="success"
          loading="lazy"
          className="w-32 lg:w-32 mb-6"
        />
        <h1 className="font-medium text-[16px] lg:text-[20px]">

          {t("success.You have successfully subscribed to the course")}
        </h1>
        <p className="font-medium text-[15px] lg:text-[18px] text-secondary">
          {t("success.You Will Receive a confirmation email soon!")}
        </p>
        <div className="flex gap-3 items-center ">
          <img src={rocket} alt="rocket icon" loading="lazy" />
          <Link to="/" className="font-medium lg:text-[18px]">

            {t("success.Go to My Courses")}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Success;
