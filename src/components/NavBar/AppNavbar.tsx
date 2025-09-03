import logo from "@/assets/images/icons/logo-text.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { useTranslation } from "react-i18next";

import AppSearchBar from "./AppSearchBar";
import { CircleUserRound, Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import NavDropdown from "./NavDropdown";
import BellWithBadge from "./BellWithBadge";
import MobileSearch from "./MobileSearch";
import LanguageToggle from "./LanguageToggle";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { useFavourites } from "@/hooks/Favorites/useFavourites";
import { useNotifications } from "@/hooks/useNotifications";

function AppNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user_id = localStorage.getItem("user_id") || null;
  const [role] = useLocalStorage("role", "");

  const { favourites } = useFavourites();
  const hasFavourites = favourites.length > 0;

  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const searchHandler = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <>
      <NavigationMenu
        className="flex justify-center items-center shadow-md shadow-accent navbar-container"
        style={{ direction: "ltr" }}>
        <div className="container flex items-center justify-between gap-2 sm:gap-4 lg:gap-24 mt-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-7 w-auto sm:h-8 md:h-10"
              loading="lazy"
            />
          </Link>

          {/* Desktop Search → مخفي في الشاشات الصغيرة */}
          <div className="hidden md:block flex-1">
            <AppSearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 *:stroke-secondaryDark navbar-actions ml-auto">
            <LanguageToggle />

            {!user_id ? (
              <Link to={pathname === "/signin" ? "/signup" : "/signin"}>
                <Button className="bg-secondaryDark text-white text-xs sm:text-sm px-2 sm:px-4">
                  {pathname === "/signin"
                    ? t("common.signUp")
                    : t("common.signIn")}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/shopping-cart">

                  <ShoppingCart size={20} className="" />
                         </Link>

                <Link
                  to="/favourites"
                  // className={`${role === "instructor" ? "hidden" : "block"}`}
                  >
                  <Heart
                    size={18}
                    className={`hover:stroke-red-600 ${
                      hasFavourites ? "stroke-red-600 fill-red-600" : ""
                    }`}
                  />
                </Link>


                <div className="relative">
     <div className="relative mt-[2px]">
           <BellWithBadge
                    count={unreadCount}
                    onClick={() => navigate("/notifications")}
                  />
                </div>


             

</div>
      <NavDropdown
                  icon={
                    <CircleUserRound className="cursor-pointer" size={18} />
                  }
                />
              </>
            )}
          </div>
        </div>
      </NavigationMenu>
      <MobileSearch onSearch={searchHandler} />
    </>
  );
}

export default AppNavbar;
