import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import arrow from "../../assets/images/icons/setting-arrow.png";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();

  return (
    <div className="bg-background">
      {/* the stack of pathes */}
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      {/* payment method */}
      <div className="mt-8 ml-4 md:ml-24 w-[90%] md:w-[50%]">
        <Link to="paymethod" className="flex justify-between w-full items-center">
        <h4 className="text-base font-semibold md:text-lg">{t("Payment Methods")}</h4>
        <img src={arrow} alt="drop down" className="w-3 h-3" />
        </Link>
      </div>
      {/* payment history */}
      <div className="mt-8 ml-4 md:ml-24 w-[90%] md:w-[50%]">
        <Link to="payhistory" className="flex justify-between w-full items-center">
        <h4 className="text-base font-semibold md:text-lg">{t("Payment History")}</h4>
        <img src={arrow} alt="drop down" className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
