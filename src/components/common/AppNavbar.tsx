import { Link, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import AppSearchBar from "./AppSearchBar";
import { Bell, CircleUserRound, Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

function AppNavbar() {

  const { pathname } = useLocation();
  const isUser = null;

  return (
    <NavigationMenu className="shadow-md gap-4 lg:gap-24 flex items-center px-8 h-[8vh]">
      <Link to="/">
        <img src="/logo-text.svg" alt="" />
      </Link>
      <AppSearchBar />
      <div className="ml-auto flex items-center gap-4 *:stroke-secondaryDark">
        {!isUser && (
          <>
            <ShoppingCart size={20} />
            <Link to={pathname === "/signin" ? "/signup" : "/signin"}>
              <Button className="bg-secondaryDark">
                {pathname === "/signin" ? "Sign up" : "Sign in"}
              </Button>
            </Link>
          </>
        )}
        {isUser && (
          <>
            <Heart size={20} />
            <Bell size={20} />
            <CircleUserRound size={20} />
          </>
        )}
      </div>

      {/* <NavigationMenuList>
        <NavigationMenuLink asChild>
          <Link to="/">Home</Link>
        </NavigationMenuLink>

        <NavigationMenuLink asChild>
          <Link to="/about">About</Link>
        </NavigationMenuLink>

        <NavigationMenuLink asChild>
          <Link to="/contact">Contact</Link>
        </NavigationMenuLink>
      </NavigationMenuList> */}
    </NavigationMenu>
  );
}
export default AppNavbar;
