import { Link } from "react-router-dom";
import notFoundIcon from "@/assets/images/icons/notfound-icon.webp";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[--secondary-background] text-center px-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg">
        <img
          src={notFoundIcon}
          alt="Learning"
          className="w-[240px] mx-auto opacity-80"
        />
        <h1 className="text-6xl font-extrabold text-[--primary] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-3 text-[--secondary-dark]">
          {`Oops! Page Not Found`}
        </h2>
        <p className="text-gray-600 mb-8 text-xs md:text-base leading-relaxed">
          The page you’re looking for might have been removed,  
          renamed, or is temporarily unavailable.  
          <br /> Don’t worry — keep learning with us!
        </p>
        <Link
          to="/"
          className="inline-block px-3 py-3 bg-[--primary] text-sm text-white rounded-xl font-semibold shadow-md hover:bg-blue-900 transition"
        >
        Back to Home
        </Link>
      </div>
    </div>
  );
}
