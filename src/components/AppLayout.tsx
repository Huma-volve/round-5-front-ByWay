import { Outlet } from "react-router-dom"
import AppNavbar from "./common/AppNavbar"

function AppLayout() {
  return (
    <div>
        <AppNavbar/>
        <Outlet/>
    </div>
  )
}
export default AppLayout