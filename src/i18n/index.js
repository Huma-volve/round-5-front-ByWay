import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n
  .use(LanguageDetector) // auto-detect language
  .use(initReactI18next) // connect with react
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'en', // default language
    interpolation: {
      escapeValue: false, // react already escapes
    },
  });

export default i18n;
