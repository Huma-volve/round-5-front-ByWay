
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/AuthForms/FormError";
import { useTranslation } from "react-i18next";
import { Spinner } from "@/components/common/Spinner";
import { useFetchAddAdmin } from "@/hooks/AdminDashboard/useFetchAddAdmin";
import { toast } from "react-toastify";

interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function AddAd({ open, onOpenChange }: PaymentDetailsProps) {
  const { t } = useTranslation();
  //data from useSignUp returns the response from the server
  const { mutate, isPending } = useFetchAddAdmin();

  //Regex
  const regexes = {
    name: /^[A-Za-z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+2)?01[0125][0-9]{8}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  //Scheme
  const scheme = yup.object({
    name: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.name, t("auth.enterValidName")),
    email: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.email, t("auth.enterValidEmail")),
    password: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .matches(regexes.password, t("auth.enterValidPassword")),
    password_confirmation: yup
      .string()
      .required(t("auth.thisFieldRequired"))
      .oneOf([yup.ref("password")], t("auth.passwordDoesntMatch"))
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: scheme,
    onSubmit: (values) => {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      mutate(formData,{
        onSuccess:(data)=>{
          onOpenChange(false);
          formik.resetForm();
          console.log(data);
          toast.success(t("adminDetails.adminAddedSuccessfully"));
        },
         onError: (error) => {
    console.error("Error adding admin:", error);
  }
      });
    },
  });
  // if (isPending) return <Spinner label={t("add Admin")} />;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-[90%] lg:w-[450px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-medium text-primary mt-4 mb-2 text-center">
            {t("adminDetails.Add New Admin")}
          </DialogTitle>
          <form
            className="auth-form  !w-[90%] m-auto"
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
          >
            {/* First and last name */}
            <div className="auth-input-group">
              <div>
                <Input
                  value={formik.values.name}
                  name="name"
                  placeholder={t("auth.name")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormError error={formik.errors.name} />
                ) : null}

              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                value={formik.values.email}
                name="email"
                placeholder={t("auth.email")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormError error={formik.errors.email} />
              ) : null}
            </div>

            {/* Passwords */}
            <div className="auth-input-group">
              <div>
                <Input
                  type="password"
                  value={formik.values.password}
                  name="password"
                  placeholder={t("auth.password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormError error={formik.errors.password} />
                ) : null}
              </div>
              <div>
                <Input
                  type="password"
                  value={formik.values.password_confirmation}
                  name="password_confirmation"
                  placeholder={t("auth.confirmPassword")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation ? (
                  <FormError error={formik.errors.password_confirmation} />
                ) : null}
              </div>
            </div>

            <Button className="auth-button" type="submit">
              {/* {t("common.Add Admin")} */}
               {isPending ? <Spinner label="Adding..." /> : "Add Admin"}
            </Button>
          </form>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddAd
