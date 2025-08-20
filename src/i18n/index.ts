import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enTranslation from "../../public/locales/en/translation.json";
import arTranslation from "../../public/locales/ar/translation.json";

// Type for resources
const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
} as const;

// Get initial language from localStorage or default to English
const getInitialLanguage = (): string => {
  const savedLanguage = localStorage.getItem("i18nextLng");
  return savedLanguage && ["en", "ar"].includes(savedLanguage)
    ? savedLanguage
    : "en";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: getInitialLanguage(), // Initialize with language from localStorage
    interpolation: {
      escapeValue: false,
    },
    // Add debug to help diagnose fallback issues
    debug: false, // Disabled for production
    // Language detection configuration
    detection: {
      order: [
        "localStorage",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage", "cookie"],
      // Map language codes to supported languages
      lookupLocalStorage: "i18nextLng",
      lookupCookie: "i18nextLng",
    },
    // Handle language code mapping (en-US -> en, etc.)
    load: "languageOnly", // This will map en-US to en
    // Support only specific languages
    supportedLngs: ["en", "ar"],
    // Clean language codes
    cleanCode: true,
  });

export default i18n;
