import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSettings, useUpdateSettings } from "./settings-hooks";
import { Loader2 } from "lucide-react";

type SettingsGroupType = {
  placeholder: string;
  mark: string;
  text: string;
  field: "commission" | "withdrawal"; // Specify which field this component handles
};

function SettingsGroup({ placeholder, mark, text, field }: SettingsGroupType) {
  // API hooks
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const scheme = yup.object({
    setting_field: yup
      .number()
  });

  const formik = useFormik({
    initialValues: {
      setting_field: settings?.[field] || "",
    },
    enableReinitialize: true, // Reinitialize when settings data loads
    validationSchema: scheme,
    onSubmit: (values) => {
      updateSettings(
        { [field]: Number(values.setting_field) },
        {
          onSuccess: () => {
            console.log(`${field} updated successfully`);
          },
          onError: (error) => {
            console.error(`Failed to update ${field}:`, error);
          },
        }
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 *:py-2">
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
          disabled={isPending}
          className={`w-28 border-secondaryDark ${mark ? "pl-8" : "pl-2"} ${
            isPending ? "opacity-50" : ""
          }`}
        />
      </div>

      <p className="flex-1">{text}</p>
      <button
        type="submit"
        disabled={!formik.dirty || !formik.isValid || isPending}
        className="w-1/4 bg-secondaryDark text-white rounded px-3 py-1 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            Saving
          </>
        ) : (
          "Save"
        )}
      </button>
      {formik.touched.setting_field && formik.errors.setting_field && (
        <span className="text-xs text-red-500 ml-2">
          {formik.errors.setting_field}
        </span>
      )}
    </form>
  );
}

export default SettingsGroup;
