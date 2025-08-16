import { Outlet } from "react-router-dom";
import AppNavbar from "../NavBar/AppNavbar";
import AppFooter from "../Footer/AppFooter";

function AppLayout() {
  return (
    <div className="layout">
      <AppNavbar />
      <main className="flex-1 flex justify-center">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
export default AppLayout;
