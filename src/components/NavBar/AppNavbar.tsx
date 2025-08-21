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

function AppNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user_id = localStorage.getItem("user_id") || null;

  const [role] = useLocalStorage("role", "")


  const searchHandler = (value: string) => {
    console.log("Searching for:", value);
    // add your search logic here
  };

  return (
    <>
      <NavigationMenu
        className="flex justify-center items-center shadow-md shadow-accent navbar-container"
        style={{ direction: "ltr" }}
      >
        <div className="container flex items-center gap-4 lg:gap-24 mt-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto sm:h-10"
              loading="lazy"
            />
          </Link>

          {/* Desktop Search */}
          <AppSearchBar />

          {/* Actions */}
          <div className="ml-auto flex items-center gap-4 *:stroke-secondaryDark navbar-actions">
            {/* Language Toggle */}
            <LanguageToggle />

            {!user_id ? (
              <Link to={pathname === "/signin" ? "/signup" : "/signin"}>
                <Button className="bg-secondaryDark text-white">
                  {pathname === "/signin"
                    ? t("common.signUp")
                    : t("common.signIn")}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/shopping-cart">
                  <ShoppingCart size={20} className="hover:fill-blue-500" />
                </Link>
                <Link to="/favourites" className={`${role === "instructor" ? "hidden" : "block"}`}>
                  <Heart size={20} className="hover:stroke-red-600" />
                </Link>
                <div className="relative">
                  <BellWithBadge
                    count={5}
                    onClick={() => navigate("/notifications")}
                  />
                </div>
                <NavDropdown
                  icon={
                    <CircleUserRound className="cursor-pointer" size={20} />
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
