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
        companyName: Yup.string().required(
          t("workExperience.companyNameRequired")
        ),
        startDate: Yup.date().required(t("workExperience.startDateRequired")),
        endDate: Yup.date()
          .required(t("workExperience.endDateRequired"))
          .min(
            Yup.ref("startDate"),
            t("workExperience.endDateBeforeStartDate")
          ),
      })
    ),
  });

// Schema for instructor profile update form
export const getInstructorProfileUpdateSchema = (t: (key: string) => string) =>
  Yup.object({
    first_name: Yup.string()
      .min(2, t("validation.firstNameMinLength"))
      .max(50, t("validation.firstNameMaxLength"))
      .required(t("validation.firstNameRequired")),
    last_name: Yup.string()
      .min(2, t("validation.lastNameMinLength"))
      .max(50, t("validation.lastNameMaxLength"))
      .required(t("validation.lastNameRequired")),
    bio: Yup.string().max(200, t("validation.bioMaxLength")).optional(),
    about: Yup.string().max(1000, t("validation.aboutMaxLength")).optional(),
    nationality: Yup.string()
      .max(50, t("validation.nationalityMaxLength"))
      .optional(),
    twitter_link: Yup.string().url(t("validation.invalidUrl")).optional(),
    linkedin_link: Yup.string().url(t("validation.invalidUrl")).optional(),
    youtube_link: Yup.string().url(t("validation.invalidUrl")).optional(),
    facebook_link: Yup.string().url(t("validation.invalidUrl")).optional(),
    image: Yup.mixed<File | string>()
      .optional()
      .test("fileSize", t("validation.fileTooLarge"), (value) => {
        if (!value || typeof value === "string") return true;
        return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", t("validation.invalidFileType"), (value) => {
        if (!value || typeof value === "string") return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          (value as File).type
        );
      }),
  });

export interface InstructorProfileUpdateFormValues {
  first_name: string;
  last_name: string;
  image?: File | string;
  bio?: string;
  about?: string;
  twitter_link?: string;
  linkedin_link?: string;
  youtube_link?: string;
  facebook_link?: string;
  nationality?: string;
}
