import { Link } from "react-router-dom";
import logo from "@/assets/images/icons/logo-text.svg";
import { useTranslation } from "react-i18next";

function AppFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-footer text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:grid md:grid-cols-4 gap-x-8 gap-y-6 flex flex-col">
          {/* Brand & Description */}
          <div>
            <Link to="/" className="block mb-4">
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Byway Logo"
                loading="lazy"
              />
            </Link>
            <p className="text-sm leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Get Help */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">
              {t("footer.getHelp")}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.latestArticles")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">
              {t("footer.programs")}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.artDesign")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.business")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.itSoftware")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.languages")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/">
                  {t("footer.programming")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="footer-header text-white font-semibold mb-4">
              {t("footer.contactUs")}
            </h2>
            <address className="not-italic mb-2 text-sm">
              {t("footer.address")}
            </address>
            <p className="text-sm">{t("footer.tel")}</p>
            <p className="text-sm">{t("footer.mail")}</p>

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
          © {new Date().getFullYear()} Byway. {t("footer.allRightsReserved")}.
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
