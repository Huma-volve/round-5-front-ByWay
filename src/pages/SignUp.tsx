import ExternalAuth from "@/components/AuthForms/ExternalAuth";
import SignUpForm from "@/components/AuthForms/SignUpForm";

function SignUp() {
  return (
    <div className="container auth-container">
      <h2 className="auth-header">Create an account</h2>
      <div className="flex items-center">
        <SignUpForm></SignUpForm>
        <img className="w-1/2" src="auth-image.jpg" alt="" />
      </div>
      <ExternalAuth/>
    </div>
  )
}
export default SignUp;
  