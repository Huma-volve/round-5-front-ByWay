import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";

type SettingsGroupType = {
  placeholder: string;
  mark: string;
  text: string
};

function SettingsGroup({ placeholder, mark, text }: SettingsGroupType) {
  const scheme = yup.object({
    setting_field: yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      setting_field: "",
    },
    validationSchema: scheme,
    onSubmit: (values) => {
        console.log(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className="flex items-center gap-2 *:py-2"
    >
      <div className="relative">
        {mark && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {mark}
          </span>
        )}
        <Input
        type="number"
          name="setting_field"
          value={formik.values.setting_field}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          className={`w-28 border-secondaryDark pl-${
            mark ? "8" : "2"
          }`} // add padding if mark is used
        />
      </div>
      <p>{text}</p>

      {formik.touched.setting_field && formik.errors.setting_field && (
        <span className="text-sm text-red-500">
          {formik.errors.setting_field}
        </span>
      )}
    </form>
  );
}
export default SettingsGroup;
