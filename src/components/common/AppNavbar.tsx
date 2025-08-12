import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link to="/about"></Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default AppNavbar;
