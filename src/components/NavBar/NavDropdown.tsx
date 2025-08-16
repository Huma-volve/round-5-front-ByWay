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

function NavDropdown({ icon }: { icon: ReactElement }) {
  const navigate = useNavigate();

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
          <Link 
            className="drop-item" 
            to="/profile"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            className="drop-item" 
            to="/courses"
          >
            My Courses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            className="drop-item" 
            to="/payment-history"
          >
            Payment History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            className="drop-item" 
            to="/settings"
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <div className="h-px bg-gray-200 my-1" />
        <DropdownMenuItem asChild>
          <button 
          onClick={()=>signOut(navigate)}
            className="drop-item text-red-600" 
          >
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdown;