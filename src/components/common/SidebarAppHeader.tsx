import { useSidebar } from "@/components/ui/sidebar";
import logo from "../../../public/logo.svg";

type Variant = "light" | "dark";

interface SidebarHeaderProps {
  variant?: Variant;
}

function SidebarAppHeader({ variant = "light" }: SidebarHeaderProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex items-center gap-2 px-2 py-3">
      {/* Logo - always visible */}
      <div className="flex-shrink-0">
        <img 
          className="w-5 object-contain" 
          loading="lazy" 
          src={logo} 
          alt="ByWay Logo" 
        />
      </div>
      
      {/* Brand text - hidden when collapsed */}
      <div className={`
        transition-all duration-200 ease-in-out overflow-hidden
        ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
      `}>
        <span className={`
          font-semibold text-lg whitespace-nowrap
          ${variant === "light" 
            ? "text-gray-900 dark:text-gray-100" 
            : "text-white"
          }
        `}>
          ByWay
        </span>
      </div>
    </div>
  );
}

export default SidebarAppHeader;