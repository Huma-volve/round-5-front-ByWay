import { useTranslation } from "react-i18next";
import RevenueChart from "../../components/instructor/revenue/RevenueChart";
import RevenueHeader from "@/components/instructor/revenue/RevenueHeader";
import IncomeTable from "@/components/instructor/revenue/IncomeTable";

export default function Revenue() {
  const { i18n } = useTranslation();
  function toggleLanguage() {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  }
  return (
    <div className="container my-3">
      <RevenueHeader />
      <RevenueChart />
      <IncomeTable />
      <button
        onClick={toggleLanguage}
        className="bg-[var(--primary)] mt-4 px-4 py-2 rounded text-white"
      >
        Toggle
      </button>
    </div>
  );
}
