
import { useTranslation } from "react-i18next";
import type { cartProps } from "@/data/cartData";
import { useFetchAllCart } from "@/hooks/Cart/useAddToCart";
import rating from "../../assets/images/icons/rating.svg";
import shopping from "../../assets/images/shopping cart.svg";
import { Loader2 } from "lucide-react";
import TotalCost from "./TotalCost";
const Cart = () => {
  const { t } = useTranslation();
  const {data,isLoading,error}=useFetchAllCart();
  let total=0;
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading cart
      </div>
    );
  }
  return (
    <>
      {data?.data.length !== 0 ? (
        <div className="flex flex-wrap items-start justify-between">
          <div className="w-[100%] lg:w-[65%] my-2" >
            <h1 className="text-seconary mb-2">{data?.data?.length} {t("cart.Course in cart")}</h1>
            <hr className="border-t-2 border-border w-full" />
            {data?.data?.map((item: cartProps) => (
              total += Number(item?.course.price),
              <div className="my-4 w-[100%] gap-3 flex flex-wrap" key={item.id}>
                <img src={shopping} alt="shopping cart" />
                <div className="flex flex-col gap-1">
                  <div className="w-[100%] flex justify-between gap-2 flex-wrap items-center ">
                    <h1 className="font-bold ">
                      {item?.course.title}
                    </h1>
                    <h1 className="text-success font-bold text-[20px] ">
                      {item.course.price}
                    </h1>
                  </div>
                  <p className="text-secondary text-[13px]">

                    {t("cart.by")} {item.auther}
                  </p>
                  <div className="text-[13px] gap-1 flex flex-wrap">
                    <span className="text-success">

                      {item.rate}
                    </span>
                    <img src={rating} alt="rating" className="w-16" />
                    <span className="text-secondary">(

                      {item.number_of_ratings} {t("cart.rating")}
                      ) | </span>

                    <span className="ellipsis w-[250px] line-clamp-1">
                      {item.course.description}
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
          <TotalCost total={total} />
        </div>
      ) : (
        <div className="flex w-[100%] h-[40vh] items-center justify-center text-secondary font-medium">Cart is Empty! </div>
      )}
    </>
  );
};
export default Cart;
