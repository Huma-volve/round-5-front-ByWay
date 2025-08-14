import facebook from "@/assets/images/icons/facebook.svg"
import google from "@/assets/images/icons/google.svg"
import microsoft from "@/assets/images/icons/microsoft.svg"

function ExternalAuth() {
  const icons = [
    { icon: facebook, label: "Facebook", color: "text-blue-600" },
    { icon: google, label: "Google", color: "text-red-600" },
    { icon: microsoft, label: "Microsoft", color: "text-gray-800" },
  ];
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="mt-10 relative flex items-center justify-center gap-2">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <p className="px-2 text-sm text-gray-500 whitespace-nowrap">or</p>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {icons.map(({ icon, label, color }) => (
          <button
            key={label}
            className="flex-1 flex items-center justify-center gap-3 py-2 px-5 border border-gray-400 rounded-md"
          >
            <img src={icon} className="w-5 h-5" alt={label} loading="lazy"/>
            <span className={`text-md ${color}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExternalAuth;
