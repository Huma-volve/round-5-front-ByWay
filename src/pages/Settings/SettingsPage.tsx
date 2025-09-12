import { useTranslation } from "react-i18next";
// import Breadcrumb from "../../components/common/Breadcrumb";
// import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import NewBreadCrumb from "../../components/common/NewBreadCrumb";
import { ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const { t } = useTranslation();
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "common.settings" },
  ], []);

  return (
    <div className="container bg-background">
      {/* the stack of pathes */}
      <div className="m-4 mt-8">
        {/* <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>
      {/* payment method */}
      <div className="mt-8 ml-4 md:ml-24 w-[90%] md:w-[50%]">
        <Link
          to="paymethod"
          className="flex justify-between w-full items-center"
        >
          <h4 className="text-base font-semibold md:text-lg">
            {t("settings.Payment Methods")}
          </h4>
          <ChevronRight className="rtl:rotate-180" />
        </Link>
      </div>
      {/* payment history */}
      <div className="mt-8 ml-4 md:ml-24 w-[90%] md:w-[50%]">
        <Link
          to="payhistory"
          className="flex justify-between w-full items-center"
        >
          <h4 className="text-base font-semibold md:text-lg">
            {t("settings.Payment History")}
          </h4>
          <ChevronRight className="rtl:rotate-180" />
        </Link>
      </div>
      {/* Close Account */}
      <div className="mt-8 ml-4 md:ml-24 w-[90%] md:w-[50%]">
        <Link
          to="/close-account"
          className="flex justify-between w-full items-center"
        >
          <h4 className="text-base font-semibold md:text-lg text-danger">
            {t("settings.Account")}
          </h4>
          <ChevronRight className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
