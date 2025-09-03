import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useField } from "formik";
import FormError from "./FormError";


function FormInput({name, className, ...props}: any) {
    const [field, meta] = useField(name)
  return (
    <div>
        <Input
        {...field}
        {...props}
        className={cn(className, meta.touched && meta.error? 'border-danger': '')}
        />
        {meta.touched && meta.error? <FormError error={meta.error}/> : null}
    </div>
  );
}
export default FormInput;
