
import { useTranslation } from "react-i18next";
import type { cartProps } from "@/data/cartData";
import { useDeleteCartItem, useFetchAllCart } from "@/hooks/Cart/useAddToCart";
import { useEffect, useState } from "react";
import rating from "../../assets/images/icons/rating.svg";
import shopping from "../../assets/images/shopping cart.svg";
import {  ShoppingCart } from "lucide-react";
import TotalCost from "./TotalCost";
import CartLoading from "./CartLoading";
import { toast } from "react-toastify";
const Cart = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetchAllCart();
  const deleteCartItem = useDeleteCartItem();
  const [cartItems, setCartItems] = useState<cartProps[]>([]);

  useEffect(() => {
    if (data?.data) {
      setCartItems(data.data);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.course.id !== id));
    deleteCartItem.mutate(id, {
      onSuccess: () =>{
        toast.success(t("cart.cart element deleted successfully"))
      },
      onError: () => {
        toast.error(t("cart.Failed to remove item"));
        if (data?.data) setCartItems(data.data);
      },
    });
  };

  const total = cartItems.reduce((sum: number, item: cartProps) => {
    return sum + Number(item.course.price);
  }, 0) ?? 0;
  if (isLoading) {
    return (
      <CartLoading />
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {t("cart.Error loading cart")}
      </div>
    );
  }
  return (
    <>
      {cartItems.length !== 0 ? (
        <div className="flex flex-wrap items-start justify-between">
          <div className="w-[100%] lg:w-[65%] my-2" >
            <h1 className="text-seconary mb-2">{cartItems.length} {t("cart.Course in cart")}</h1>
            <hr className="border-t-2 border-border w-full" />
            {cartItems.map((item: cartProps) => (
              <div className="my-4 w-[100%] gap-3 flex flex-wrap" key={item.id}>
                {/* <img src={`https://round5-byway.huma-volve.com/api${item.course.image_url}` || shopping} alt="shopping cart" /> */}
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
                    {t("cart.by")} {item.instructor}
                  </p>
                  <div className="text-[13px] gap-1 flex flex-wrap">
                    <span className="text-success">
                      {item.course.rating}
                    </span>
                    <img src={rating} alt="rating" className="w-16" />
                    <span className="text-secondary">(
                      {item.course.number_of_ratings} {t("cart.rating")}
                      ) | </span>
                    <span className="ellipsis w-[250px] line-clamp-1">
                      {item.course.description}
                    </span>
                  </div>
                  <h1 className="text-[13px] text-rate">
                    <button onClick={() => handleDelete(item?.course?.id)} className="text-danger">  {t("cart.Remove")}</button>
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <TotalCost total={total} />
        </div>
      ) : (
        <div className="flex gap-4 flex-col  w-[100%] h-[40vh] items-center justify-center text-secondary font-medium  rounded-lg bg-[#F8FAFC]">
          <ShoppingCart className="animate-bounce w-12 h-12 mb-2 text-secondary" />
          {t("cart.Cart is Empty")}!
        </div>
      )}
    </>
  );
};
export default Cart;
