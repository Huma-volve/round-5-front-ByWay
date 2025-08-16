import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UseLanguageReturn {
  language: string;
  isRTL: boolean;
  changeLanguage: (languageCode: string) => Promise<void>;
  setDocumentDirection: (languageCode: string) => void;
}

export const useLanguage = (): UseLanguageReturn => {
  const { i18n } = useTranslation();

  const setDocumentDirection = (languageCode: string) => {
    const isRTL = languageCode === "ar";

    // Update document attributes
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = languageCode;

    // Update body classes for styling
    if (isRTL) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }

    // Keep navbar direction LTR always
    const navbar = document.querySelector(".navbar-container");
    if (navbar) {
      (navbar as HTMLElement).style.direction = "ltr";
    }
  };

  const changeLanguage = async (languageCode: string): Promise<void> => {
    try {
      await i18n.changeLanguage(languageCode);
      setDocumentDirection(languageCode);
      localStorage.setItem("i18nextLng", languageCode);
    } catch (error) {
      console.error("Failed to change language:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Set initial direction based on current language
    setDocumentDirection(i18n.language);

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      setDocumentDirection(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return {
    language: i18n.language,
    isRTL: i18n.language === "ar",
    changeLanguage,
    setDocumentDirection,
  };
};
