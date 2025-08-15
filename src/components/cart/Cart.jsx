import shopping from "../../assets/images/shopping cart.svg";
import rating from "../../assets/images/icons/rating.svg";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Cart = () => {
    const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="w-[100%] lg:w-[65%] my-2">
      <h1 className="text-seconary mb-2">1 {t("cart.Course in cart")}</h1>
      <hr className="border-t-2 border-border w-full" />
      <div className="my-4 w-[100%] gap-3 flex flex-wrap">
        <img src={shopping} alt="shopping cart" />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 lg:gap-60 flex-wrap items-center ">
            <h1 className="font-bold ">Graphic Design</h1>
            <h1 className="text-success font-bold text-[20px]">400 EGP</h1>
          </div>
          <p className="text-secondary text-[13px]">By Amira Mohamed</p>
          <div className="text-[13px] gap-1 flex flex-wrap">
            <span className="text-success">4.6</span>
            <img src={rating} alt="rating" className="w-16" />
            <span className="text-secondary">(250 rating) | </span>
            22 Total Hours. 155 Lectures. All levels
          </div>
          <h1 className="text-[13px] text-rate">
            Save for later
            <span className="text-danger"> | Remove</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Cart;
