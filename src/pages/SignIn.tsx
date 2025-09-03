/**
 * todo
 * Implement signIn, define fetch function, create react query, design mobile first
 */

import ExternalAuth from "@/components/AuthForms/ExternalAuth";
import SignInForm from "@/components/AuthForms/SignInForm";
import { useTranslation } from "react-i18next";

function SignIn() {
  const { t } = useTranslation();

  return (
    <div className="">
      <h2 className="auth-header">{t("auth.loginToAccount")}</h2>
      <SignInForm />
      <ExternalAuth />
    </div>
  );
}
export default SignIn;
