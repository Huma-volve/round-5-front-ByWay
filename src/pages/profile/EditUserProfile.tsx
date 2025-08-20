import { type userProfile } from "@/data/userProfile";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import edit from "../../assets/images/icons/edit.svg";
import axiosInstance from "@/lib/axios-instance";
import profile from "../../assets/images/icons/profile.svg";
import { toast } from "react-toastify";

const EditUserProfile = () => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState<userProfile>();

  useEffect(() => {
    axiosInstance.get("/profile")
      .then(res => {
        setUser(res.data.data.user);
      })
  }, [])

  console.log(user)
  const [previewImage, setPreviewImage] = useState<string | undefined>(user?.image);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (user?.image) setPreviewImage(user.image);
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={{
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        headline: user?.headline || "",
        about: user?.about || "",
        twitter_link: user?.twitter_link || "",
        linkedin_link: user?.linkedin_link || "",
        youtube_link: user?.youtube_link || "",
        facebook_link: user?.facebook_link || "",
        image: user?.image || ""
      }}
      validationSchema={Yup.object({
        first_name: Yup.string()
          .min(2, t('instructor.firstNameMin'))
          .required(t('instructor.firstNameRequired')),
        last_name: Yup.string()
          .min(2, t('instructor.lastNameMin'))
          .required(t('instructor.lastNameRequired')),
        headline: Yup.string()
          .max(50, t('instructor.headlineMax'))
          .required(t('instructor.headlineRequired')),
        about: Yup.string()
          .max(200, t('instructor.aboutMax'))
          .required(t('instructor.aboutRequired')),
        twitter_link: Yup.string().required(t('profile.link required')),
        linkedin_link: Yup.string().required(t('profile.link required')),
        youtube_link: Yup.string().required(t('profile.link required')),
        facebook_link: Yup.string().required(t('profile.link required'))

      })}
      onSubmit={(values, { setSubmitting }) => {
        axiosInstance
          .put("/profile", values)
          .then((res) => {
            setUser(res.data.data.user);
            toast.success(t("profile.profileUpdated"));
            // setPreviewImage(res.data.data.user.image);
          })
          .catch((err) => console.error(err))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (<div className="container m-8 p-12 ">
        <div className="flex gap-4 m-3">
          <img src={edit} alt="edit" loading="lazy" />
          <h1 className="font-bold">{t("profile.Edit Profile")}</h1>
        </div>
        <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end ">
          <img
            src={previewImage || profile}
            alt={user?.first_name}
            loading="lazy"
            className="w-32 h-32 mb-[-20px] rounded-[50%]"
          />
          <img
            src={edit}
            alt="edit"
            loading="lazy"
            className={`w-8 h-8  mb-[-20px] curser-pointer bg-placeholder  mb-[-10px]  py-2 rounded-full ${i18n.language === "ar" ? "mr-[-25px]" : "ml-[-25px]"} `}
          />
          <input
            type="file"
            name="image"
            onChange={handleImage}
            className={`curser-pointer opacity-0 rounded-full w-8  mb-[-10px] ${i18n.language === "ar" ? "mr-[-30px]" : "ml-[-30px]"} `}
          />
        </div>
        <Form >
          <div className=" ml-[10%]  flex flex-col m-auto justify-center">
            <div className="flex gap-8 lg:gap-80  flex-wrap my-8">
              <div>
                <label
                  htmlFor="first_name"
                  className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
                >
                  {t("profile.First Name")}
                </label>
                <br />
                <Field
                  name="first_name"
                  className="mt-2 border-2 border-border rounded-[8px] p-[16px] outline-none hover:border-primary "
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="first_name" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
                >
                  {t("profile.Last Name")}
                </label>
                <br />
                <Field
                  name="last_name"
                  className="mt-2 border-2 border-border rounded-[8px] p-[16px] outline-none hover:border-primary "
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="last_name" />
                </div>
              </div>
            </div>

            <div className="my-8">
              <label
                htmlFor="headline"
                className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
              >
                {t("profile.Headline")}
              </label>
              <br />
              <Field
                name="headline"
                as="textarea"
                className="mt-2 border-2 border-border rounded-[8px] p-[16px] w-[90%] outline-none hover:border-primary "
              />
              <div className="text-danger text-[13px]">
                <ErrorMessage name="headline" />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="about"
                className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
              >
                {t("profile.About")}
              </label>
              <br />
              <Field
                name="about"
                as="textarea"
                className="mt-2 border-2 border-border rounded-[8px] p-[16px] w-[90%] outline-none hover:border-primary "
              />
              <div className="text-danger text-[13px]">
                <ErrorMessage name="about" />
              </div>
            </div>
            <div className="border-2 border-border rounded-[8px] w-[90%] p-8 mt-8">
              <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
                {t("profile.Links")}
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="twitter_link"
                  className="text-primary text-[14px]  mb-2"
                >
                  {t("profile.X(Formerly twitter)")}
                </label>
                <br />
                <Field
                  name="twitter_link"
                  className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="twitter_link" />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="linkedin_link"
                  className="text-primary text-[14px]  mb-2"
                >
                  {t("profile.Linkedin")}
                </label>
                <br />
                <Field
                  name="linkedin_link"
                  className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="linkedin_link" />

                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="youtube_link"
                  className="text-primary text-[14px]  mb-2"
                >
                  {t("profile.Youtube")}
                </label>
                <br />
                <Field
                  name="youtube_link"
                  className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="youtube_link" />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="facebook_link"
                  className="text-primary text-[14px]  mb-2"
                >
                  {t("profile.Facebook")}
                </label>
                <br />
                <Field
                  name="facebook_link"
                  className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
                />
                <div className="text-danger text-[13px]">
                  <ErrorMessage name="facebook_link" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-[110px] bg-primary rounded-lg p-2 text-white ml-[50%] md:ml-[75%] mt-4 hover:opacity-[.9]">
            Save
          </button>
        </Form>
      </div>
      )}
    </Formik >
  );
};
export default EditUserProfile;
