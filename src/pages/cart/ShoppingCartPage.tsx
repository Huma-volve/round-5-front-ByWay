
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useTranslation } from "react-i18next";
import Cart from "@/components/cart/Cart";
import TotalCost from "@/components/cart/TotalCost";

const ShoppingCartPage = () => {
  const { getAutoBreadcrumb } = useBreadcrumb();
    const { t} = useTranslation();
  return (
    <div className="container mx-auto my-8">
      <div className="flex lg:gap-8 items-center flex-wrap ">
        <h1 className="font-bold text-[25px] mb-1">{t("cart.Shopping Cart")}</h1>
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>
      <div className="flex flex-wrap items-start justify-between">
        <Cart />
        <TotalCost />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
