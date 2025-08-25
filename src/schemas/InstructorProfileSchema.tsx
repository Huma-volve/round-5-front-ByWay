
import * as Yup from "yup";

export const getInstructorProfileSchema = (t: (key: string) => string) =>
  Yup.object({
    fname: Yup.string().required(t("instructor.firstNameRequired")),
    lname: Yup.string().required(t("instructor.lastNameRequired")),
    headline: Yup.string().required(t("instructor.headlineRequired")),
    about: Yup.string().required(t("instructor.aboutRequired")),
    skills: Yup.string().required(t("instructor.skillsRequired")),
    workExperience: Yup.array().of(
      Yup.object({
        jobTitle: Yup.string().required(t("workExperience.jobTitleRequired")),
        companyName: Yup.string().required(t("workExperience.companyNameRequired")),
        startDate: Yup.date().required(t("workExperience.startDateRequired")),
        endDate: Yup.date()
          .required(t("workExperience.endDateRequired"))
          .min(Yup.ref("startDate"), t("workExperience.endDateBeforeStartDate")),
      })
    ),
  });
