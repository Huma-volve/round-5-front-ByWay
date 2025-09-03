
function SettingsCard({children, header}: {children:React.ReactNode, header:string}) {
  return (
    <div className="lg:w-[80%] bg-white px-4 py-4 my-8 border shadow-sm rounded-md">
        <h2 className="font-semibold mb-6">{header}</h2>
        {children}
    </div>
  )
}
export default SettingsCard