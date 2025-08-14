import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CloseAccount = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="w-[90%] lg:w-[50%] h-[100dvh] flex flex-col items-center justify-center mx-auto text-center">
      <h1 className="font-bold text-[30px]">{t("closeAccount.Close Account")}</h1>
      <p className="text-secondaryDark font-400">{t("closeAccount.Close your account permanently.")}</p>
      <h4 className="font-medium m-4 lg:text-[17px]">
        <span className="text-danger text-[24px]">{t("closeAccount.Warning")}:</span>
        {t("closeAccount.warning1")}
      </h4>
      <h4 className="font-medium lg:text-[17px] w-[80%] mx-auto my-4">
       {t("closeAccount.warning2")}
      </h4>
    </div>
  );
};
export default CloseAccount;
