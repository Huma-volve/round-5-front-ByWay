import { Outlet } from "react-router-dom";
import AppNavbar from "../NavBar/AppNavbar";
import AppFooter from "../Footer/AppFooter";
import authImage from "@/assets/images/auth-image.jpg"

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar />
      <main className="container flex flex-col items-center lg:flex-row flex-1">
        <div className="flex flex-1 items-center justify-between py-6 lg:py-0">
          <Outlet />
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={authImage}
            loading="lazy"
            alt="Auth"
            className=""
          />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
