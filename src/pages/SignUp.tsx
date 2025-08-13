import ExternalAuth from "@/components/AuthForms/ExternalAuth";
import SignUpForm from "@/components/AuthForms/SignUpForm";

function SignUp() {
  return (
    <div className="auth-container">
      <h2 className="auth-header">Create an account</h2>
      <SignUpForm></SignUpForm>
      <ExternalAuth/>
    </div>
  )
}
export default SignUp;
  