import { type userProfile } from "@/data/userProfile";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import edit from "../../assets/images/icons/edit.svg";
type userType = {
  user: userProfile;
};
const EditUserProfile: React.FC<userType> = ({ user }) => {
  const { t, i18n } = useTranslation();
  const [previewImage, setPreviewImage] = useState(user.image);
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Formik
        initialValues={{
          fname: user.fname,
          lname: user.lname,
          headline: user.headline,
          about: user.about,
          links: {
            x: user.links.x,
            linkedin: user.links.linkedin,
            youtube: user.links.youtube,
            facebook: user.links.facebook,
          },
        }}
        validationSchema={Yup.object({
          fname: Yup.string().max(15).required(),
          lname: Yup.string().max(15).required(),
          headline: Yup.string().required(),
          about: Yup.string().required(),
          links: Yup.object({
            x: Yup.string().url().required(),
            linkedin: Yup.string().url().required(),
            youtube: Yup.string().url().required(),
            facebook: Yup.string().url().required()
          })
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
  <div className="container m-8 p-12 ">
    <div className="flex gap-4 m-3">
      <img src={edit} alt="edit" loading="lazy" />
      <h1 className="font-bold">{t("profile.Edit Profile")}</h1>
    </div>
    <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end ">
      <img
        src={previewImage}
        alt={user.fname}
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

    <Form>
      <div className=" ml-[10%]  flex flex-col m-auto justify-center">
        <div className="flex gap-8 lg:gap-80  flex-wrap my-8">
          <div>
            <label
              htmlFor="fname"
              className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
            >
              {t("profile.First Name")}
            </label>
            <br />
            <Field
              name="fname"
              className="mt-2 border-2 border-border rounded-[8px] p-[16px] outline-none hover:border-primary "
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="fname" />
            </div>
          </div>
          <div>
            <label
              htmlFor="lname"
              className="text-primary text-[17px] md:text-[20px] font-bold mb-2"
            >
              {t("profile.Last Name")}
            </label>
            <br />
            <Field
              name="lname"
              className="mt-2 border-2 border-border rounded-[8px] p-[16px] outline-none hover:border-primary "
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="lname" />
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
              htmlFor="links.x"
              className="text-primary text-[14px]  mb-2"
            >
              {t("profile.X(Formerly twitter)")}
            </label>
            <br />
            <Field
              name="links.x"
              className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="links.x" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="links.linkedin"
              className="text-primary text-[14px]  mb-2"
            >
              {t("profile.Linkedin")}
            </label>
            <br />
            <Field
              name="links.linkedin"
              className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="links.linkedin" />

            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="links.youtube"
              className="text-primary text-[14px]  mb-2"
            >
              {t("profile.Youtube")}
            </label>
            <br />
            <Field
              name="links.youtube"
              className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="links.youtube" />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="links.facebook"
              className="text-primary text-[14px]  mb-2"
            >
              {t("profile.Facebook")}
            </label>
            <br />
            <Field
              name="links.facebook"
              className="mt-2 border border-border rounded-[8px] p-[16px] w-[100%] outline-none hover:border-primary text-[13px]"
            />
            <div className="text-danger text-[13px]">
              <ErrorMessage name="links.facebook" />
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
    </Formik >
  );
};
export default EditUserProfile;
