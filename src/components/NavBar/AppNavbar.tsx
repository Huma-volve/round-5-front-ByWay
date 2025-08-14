import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  NavigationMenu,
} from "@radix-ui/react-navigation-menu";

import AppSearchBar from "./AppSearchBar";
import { CircleUserRound, Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import NavDropdown from "./NavDropdown";
import BellWithBadge from "./BellWithBadge";

function AppNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const isUser = true;

  return (
    <NavigationMenu className="flex justify-center items-center shadow-md shadow-accent h-[8vh] py-2">
      <div className="w-[80%] gap-4 lg:gap-24 flex items-center mt-3">
        <Link to="/">
          <img src="/logo-text.svg" alt="" />
        </Link>
        <AppSearchBar />
        <div className="ml-auto flex items-center gap-4 *:stroke-secondaryDark">
          <Link to="/shopping">
            <ShoppingCart size={20} className="hover:fill-blue-500" />
          </Link>
          {!isUser && (
            <>
              <Link to={pathname === "/signin" ? "/signup" : "/signin"}>
                <Button className="bg-secondaryDark">
                  {pathname === "/signin" ? "Sign up" : "Sign in"}
                </Button>
              </Link>
            </>
          )}
          {isUser && (
            <>
              <Link to="/favourites">
                <Heart size={20} className="hover:stroke-red-600" />
              </Link>

              {/* <div className="relative">
                <Link to="/notifications">
                  <Bell size={20} className="stroke-yellow-400" />
                  <span className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-sans">
                    0
                  </span>
                </Link>
              </div> */}

              <div className="relative">
                <BellWithBadge count={5} onClick={()=> navigate('/notifications')}/>
              </div>

              <NavDropdown
                icon={<CircleUserRound className="cursor-pointer" size={20} />}
              />
            </>
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
export default AppNavbar;
