import ExternalAuth from "@/components/AuthForms/ExternalAuth";
import SignUpForm from "@/components/AuthForms/SignUpForm";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { t } = useTranslation();

  return (
    <div className="">
      <h2 className="auth-header">{t("auth.createAccount")}</h2>
      <div className="">
        <SignUpForm></SignUpForm>
      </div>
      <ExternalAuth />
    </div>
  );
}
export default SignUp;
