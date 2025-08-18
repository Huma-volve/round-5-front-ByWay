
import { useTranslation } from "react-i18next";
import type { CartProps } from "@/data/cartData";
import CART_DATA from "@/data/cartData";

const Cart = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-[100%] lg:w-[65%] my-2" >
        <h1 className="text-seconary mb-2">{CART_DATA.length} {t("cart.Course in cart")}</h1>
        <hr className="border-t-2 border-border w-full" />
        {CART_DATA.map((item: CartProps) => (
          <div className="my-4 w-[100%] gap-3 flex flex-wrap" key={item.id}>
            <img src={item.image} alt="shopping cart" />
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 lg:gap-60 flex-wrap items-center ">
                <h1 className="font-bold ">
                  {item.title}
                </h1>
                <h1 className="text-success font-bold text-[20px]">

                  {item.price}
                </h1>
              </div>
              <p className="text-secondary text-[13px]">

                {t("cart.by")} {item.auther}
              </p>
              <div className="text-[13px] gap-1 flex flex-wrap">
                <span className="text-success">

                  {item.rate}
                </span>
                <img src={item.rating_img} alt="rating" className="w-16" />
                <span className="text-secondary">(

                  {item.number_of_ratings} {t("cart.rating")}
                  ) | </span>

                <span className="ellipsis w-[250px] line-clamp-1">
                  {item.description}
                </span>
              </div>
              <h1 className="text-[13px] text-rate">
                {t("cart.Save for later")}
                <span className="text-danger"> | {t("cart.Remove")}</span>
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Cart;
