/**
 * todo
 * Implement signIn, define fetch function, create react query, design mobile first
 */

import ExternalAuth from "@/components/AuthForms/ExternalAuth"
import SignInForm from "@/components/AuthForms/SignInForm"

function SignIn() {
  return (
    <div className="auth-container">
      <h2 className="auth-header">Log in into your account</h2>
      <SignInForm/>
      <ExternalAuth/>
    </div>
  )
}
export default SignIn