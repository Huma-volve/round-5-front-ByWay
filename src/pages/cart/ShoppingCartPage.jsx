import Cart from "../../components/cart/Cart";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import Breadcrumb from "@/components/common/Breadcrumb";
import TotalCost from "../../components/cart/TotalCost";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ShoppingCartPage = () => {
  const { getAutoBreadcrumb } = useBreadcrumb();
    const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex lg:gap-8 items-center flex-wrap">
        <h1 className="font-bold text-[25px] mb-1">{t("cart.Shopping Cart")}</h1>
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      <div className="flex flex-wrap  justify-between">
        <Cart />
        <TotalCost />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
