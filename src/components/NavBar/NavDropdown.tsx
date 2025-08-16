import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
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
        className="mt-1 p-1"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuArrow className="fill-white drop-shadow-sm" />
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/profile">
            {t("common.profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/courses">
            {t("common.myCourses")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/payment-history">
            {t("common.paymentHistory")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="drop-item" to="/settings">
            {t("common.settings")}
          </Link>
        </DropdownMenuItem>
        <div className="h-px bg-gray-200 my-1" />
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut(navigate)}
            className="drop-item text-red-600"
          >
            {t("common.signOut")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdown;
