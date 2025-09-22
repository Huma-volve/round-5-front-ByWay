import logo from "../../../public/logo.svg"

type Variant = "light" | "dark"

function AppLogo({variant}:{variant: Variant}) {
  const color = variant === "light"? "black" : "white"
  return (
    <div className="flex items-center">
        <img className="w-4" loading="lazy" src={logo} alt="ByWay-Logo" />
        <span className={`text-${color}`}>ByWay</span>
    </div>
  )
}
export default AppLogo
