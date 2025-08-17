import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@/api/auth-api";
import { useTranslation } from "react-i18next";

function NavDropdown({ icon }: { icon: ReactElement }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
          {icon}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-1 p-1 min-w-[200px]"
        align="end"
        side="bottom"
        sideOffset={8}
        // Fix layout shift by using portal and proper positioning
        avoidCollisions={true}
        collisionPadding={8}
        sticky="always"
      >
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/profile">
            {t("common.profile")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/learner-myCourses">
            {t("common.myCourses")}
          </Link>
        </DropdownMenuItem>
        
        
        {/* <DropdownMenuItem asChild>
          <Link className="drop-item" to="/favourites">
            {t("common.favourites")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/settings/paymethod">
            {t("common.paymethod")}
          </Link>
        </DropdownMenuItem>
         */}
         
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/settings/payhistory">
            {t("common.paymentHistory")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/notifications">
            {t("common.notifications")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/settings">
            {t("common.settings")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut(navigate)}
            className="drop-item text-red-600 w-full text-left"
          >
            {t("common.signOut")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdown;