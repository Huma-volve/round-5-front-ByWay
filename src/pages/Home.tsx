import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{t("common.home")}</h1>

      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t("common.home")}
        </Link>

        <Link
          to="/instructor"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {t("common.instructor")}
        </Link>

        <Link
          to="/favourites"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {t("common.favourites")}
        </Link>

        <Link
          to="/notifications"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {t("common.notifications")}
        </Link>

        <Link
          to="/settings"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {t("common.settings")}
        </Link>

        <Link
          to="/settings/paymethod"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          {t("common.paymethod")}
        </Link>

        <Link
          to="/settings/payhistory"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          {t("common.payhistory")}
        </Link>
      </nav>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Language Test</h2>
        <p className="mb-2">
          Current content should change when you switch languages using the
          navbar toggle.
        </p>
        <p className="mb-2">
          النص باللغة العربية يجب أن يظهر من اليمين إلى اليسار
        </p>
        <p>English text should appear left to right</p>
      </div>
    </div>
  );
}
