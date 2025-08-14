import { Link } from "react-router-dom";
import logo from "@/assets/images/icons/logo-text.svg"

function AppFooter() {
  return (
    <footer className="bg-footer text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:grid md:grid-cols-4 gap-x-8 gap-y-6 flex flex-col">
          
          {/* Brand & Description */}
          <div>
            <Link to="/" className="block mb-4">
              <img className="h-8 w-auto" src={logo} alt="Byway Logo" loading="lazy"/>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering learners through accessible and engaging online education.
              Byway is a leading online learning platform dedicated to providing
              high-quality, flexible, and affordable educational experiences.
            </p>
          </div>

          {/* Get Help */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">Get Help</h2>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-white" to="/">Latest Articles</Link></li>
              <li><Link className="hover:text-white" to="/">FAQ</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">Programs</h2>
            <ul className="space-y-2">
              <li><Link className="hover:text-white" to="/">Art & Design</Link></li>
              <li><Link className="hover:text-white" to="/">Business</Link></li>
              <li><Link className="hover:text-white" to="/">IT & Software</Link></li>
              <li><Link className="hover:text-white" to="/">Languages</Link></li>
              <li><Link className="hover:text-white" to="/">Programming</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">Contact Us</h2>
            <address className="not-italic mb-2 text-sm">
              Address: 123 Main Street, Anytown, CA 12345
            </address>
            <p className="text-sm">Tel: +1 (123) 456-7890</p>
            <p className="text-sm">Mail: bywayedu@webkul.in</p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <span className="h-8 w-8 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"></span>
              <span className="h-8 w-8 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"></span>
              <span className="h-8 w-8 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"></span>
              <span className="h-8 w-8 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"></span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Byway. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
