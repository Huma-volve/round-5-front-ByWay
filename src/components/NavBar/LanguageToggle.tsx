import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { useLanguage } from "../../hooks/useLanguage";
import { Languages } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
  },
];

function LanguageToggle({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages.find((lang) => lang.code === language) || languages[0]
  );

  useEffect(() => {
    const selectedLanguage =
      languages.find((lang) => lang.code === language) || languages[0];
    setCurrentLanguage(selectedLanguage);
  }, [language]);

  const handleToggle = async () => {
    try {
      // Toggle between English and Arabic
      const newLanguageCode = currentLanguage.code === "en" ? "ar" : "en";
      const newLanguage =
        languages.find((lang) => lang.code === newLanguageCode) || languages[0];

      await changeLanguage(newLanguageCode);
      setCurrentLanguage(newLanguage);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={
        " px-3 py-1 hover:bg-gray-100 transition-all duration-200 border border-gray-200 rounded-md " +
        className
      }
      title={t("common.selectLanguage")}
    >
      <Languages />
      <span className="w-full flex items-center gap-2">
        <span
          className={
            ` font-medium text-lg  ${className ? " " : " text-secondaryDark"} uppercase`
          }
        >
          {currentLanguage.code}
        </span>
      </span>
    </Button>
  );
}

export default LanguageToggle;
