
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
// import Breadcrumb from "@/components/common/Breadcrumb";
import Cart from "@/components/cart/Cart";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

const ShoppingCartPage = () => {
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "cart.Shopping Cart" },
  ], []);
  return (
    <div className="container mx-auto my-8">
      <div >
        {/* <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" /> */}
        <NewBreadCrumb items={breadcrumbItems} />
        {/* <h1 className="font-bold text-[25px] mb-1">{t("cart.Shopping Cart")}</h1> */}
      </div>
      <div >
        <Cart />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
