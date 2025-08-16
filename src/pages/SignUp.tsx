import ExternalAuth from "@/components/AuthForms/ExternalAuth";
import SignUpForm from "@/components/AuthForms/SignUpForm";

function SignUp() {
  return (
    <div className="">
      <h2 className="auth-header">Create an account</h2>
      <div className="">
        <SignUpForm></SignUpForm>
      </div>
      <ExternalAuth/>
    </div>
  )
}
export default SignUp;
  