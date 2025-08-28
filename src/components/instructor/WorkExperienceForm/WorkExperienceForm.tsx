//  import { useFormik } from "formik";
//  import * as Yup from "yup";
//  import { useTranslation } from "react-i18next";

//  export default function WorkExperienceForm({ title, onAdd }: { title: string; onAdd?: () => void }) {
//    const { t } = useTranslation();

//   const validationSchema = Yup.object({
//     jobTitle: Yup.string()
//       .min(2, t("workExperience.jobTitleMin"))
//       .required(t("workExperience.jobTitleRequired")),
//     companyName: Yup.string()
//       .min(2, t("workExperience.companyNameMin"))
//       .required(t("workExperience.companyNameRequired")),
//     startDate: Yup.date()
//       .required(t("workExperience.startDateRequired"))
//       .typeError(t("workExperience.invalidDate")),
//     endDate: Yup.date()
//       .required(t("workExperience.endDateRequired"))
//       .typeError(t("workExperience.invalidDate"))
//       .min(Yup.ref("startDate"), t("workExperience.endDateBeforeStartDate")),
//   });

//   const formik = useFormik({
//     initialValues: {
//       jobTitle: "",
//       companyName: "",
//       startDate: "",
//       endDate: "",
//     },
//     validationSchema,
//     onSubmit: () => {
//       if (onAdd) onAdd();
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <section className="space-y-3">
//         <div className="space-y-1">
//           <h2>{title}</h2>
//           <input
//             type="text"
//             name="jobTitle"
//             className="input w-full"
//             placeholder={t("workExperience.enterJobTitle")}
//             value={formik.values.jobTitle}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.jobTitle && formik.errors.jobTitle && (
//             <p className="text-red-500 text-sm">{formik.errors.jobTitle}</p>
//           )}
//         </div>

//         <div className="space-y-1">
//           <input
//             type="text"
//             name="companyName"
//             className="input w-full"
//             placeholder={t("workExperience.enterCompanyName")}
//             value={formik.values.companyName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.companyName && formik.errors.companyName && (
//             <p className="text-red-500 text-sm">{formik.errors.companyName}</p>
//           )}
//         </div>

//         <div className="flex gap-4">
//           <div className="flex flex-col space-y-1 w-full">
//             <label htmlFor="startDate">{t("workExperience.startDate")}</label>
//             <input
//               type="date"
//               name="startDate"
//               id="startDate"
//               className="input"
//               value={formik.values.startDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.startDate && formik.errors.startDate && (
//               <p className="text-red-500 text-sm">{formik.errors.startDate}</p>
//             )}
//           </div>

//           <div className="flex flex-col space-y-1 w-full">
//             <label htmlFor="endDate">{t("workExperience.endDate")}</label>
//             <input
//               type="date"
//               name="endDate"
//               id="endDate"
//               className="input"
//               value={formik.values.endDate}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.endDate && formik.errors.endDate && (
//               <p className="text-red-500 text-sm">{formik.errors.endDate}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {onAdd && (
//             <button type="submit" className="px-2 py-1 bg-revenue2Graph text-white rounded">
//               {t("workExperience.addAnotherExperience")}
//             </button>
//           )}
//         </div>
//       </section>
//     </form>
//   );
// }


import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

export default function WorkExperienceForm({ title, onAdd, index }: { title: string; onAdd?: () => void; index: number }) {
  const { t } = useTranslation();
 interface WorkExperience {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
}

  interface InstructorFormValues {
    fname: string;
    lname: string;
    headline: string;
    about: string;
    skills: string;
    workExperience: WorkExperience[];
  }
const { values, errors, touched, handleChange, handleBlur } = useFormikContext<InstructorFormValues>();

  return (
    <section className="space-y-3">
      <h2>{title}</h2>
<div className="space-y-1">
      <input
        type="text"
        name={`workExperience[${index}].jobTitle`}
        value={values.workExperience[index].jobTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={t("workExperience.enterJobTitle")}
        className="input w-full"
      />
      {typeof errors.workExperience?.[index] === "object" &&
      errors.workExperience?.[index]?.jobTitle && touched.workExperience?.[index]?.jobTitle && (
        <p className="text-red-500 text-sm">{errors.workExperience[index].jobTitle}</p>
      )}
      </div>

     <div className="space-y-1">
      <input
        type="text"
        name={`workExperience[${index}].companyName`}
        value={values.workExperience[index].companyName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={t("workExperience.enterCompanyName")}
        className="input w-full"
      />
      { typeof errors.workExperience?.[index] === "object" &&
      errors.workExperience?.[index]?.companyName && touched.workExperience?.[index]?.companyName && (
        <p className="text-red-500 text-sm">{errors.workExperience[index].companyName}</p>
      )}
</div>

 
<div className="flex gap-4">
  <div className="flex flex-col space-y-1 w-full">
    <label htmlFor={`workExperience[${index}].startDate`}>
      {t("workExperience.startDate")}
    </label>
    <input
      type="date"
      name={`workExperience[${index}].startDate`}
      id={`workExperience-${index}-startDate`}
      className="input"
      value={values.workExperience[index].startDate}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    { typeof errors.workExperience?.[index] === "object" &&
    touched.workExperience?.[index]?.startDate &&
      errors.workExperience?.[index]?.startDate && (
        <p className="text-red-500 text-sm">
          {errors.workExperience[index].startDate}
        </p>
      )}
  </div>

  <div className="flex flex-col space-y-1 w-full">
    <label htmlFor={`workExperience[${index}].endDate`}>
      {t("workExperience.endDate")}
    </label>
    <input
      type="date"
      name={`workExperience[${index}].endDate`}
      id={`workExperience-${index}-endDate`}
      className="input"
      value={values.workExperience[index].endDate}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {typeof errors.workExperience?.[index] === "object" &&
    touched.workExperience?.[index]?.endDate &&
      errors.workExperience?.[index]?.endDate && (
        <p className="text-red-500 text-sm">
          {errors.workExperience[index].endDate}
        </p>
      )}
  </div>
</div>


{onAdd && (
        <button type="button" onClick={onAdd} className="px-2 py-1 bg-revenue2Graph text-white rounded">
          {t("workExperience.addAnotherExperience")}
        </button>
      )}
    </section>
  );
}
