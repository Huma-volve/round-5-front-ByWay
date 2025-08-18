
import { TOTAL_COST } from "@/data/totalCost";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TotalCost = () => {
  const { t } = useTranslation();
  return (
    <div className="w-[100%] lg:w-[30%] my-12 flex flex-col  justify-center">
      <div className=" bg-[#F8FAFC] rounded-[8px] px-4 border border-border">
        <div className="flex justify-between p-4">
          <h1 className="text-[15px]">{t("cart.Price")}</h1>
          <h1 className="font-medium">{TOTAL_COST.price}</h1>
        </div>
        <div className="flex justify-between p-4 mb-4">
          <h1 className="text-[15px]">{t("cart.Discount")}</h1>
          <h1 className="font-medium">{TOTAL_COST.discount}</h1>
        </div>
        <div className="flex font-medium justify-between p-4 border-t-2 border-border pt-3">
          <h1>{t("cart.Total")}</h1>
          <h1>{TOTAL_COST.total}</h1>
        </div>
      </div>
      <Link to="/checkout">
        <button className="bg-success text-white rounded-[8px] p-2  lg:ml-20 mt-4 ">
          {t("cart.Proceed to Checkout")}
        </button>
      </Link>
    </div>
  );
};

export default TotalCost;
