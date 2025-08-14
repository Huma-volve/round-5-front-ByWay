import { type userProfile } from "@/data/userProfile";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import edit from "../../assets/images/icons/edit.svg";

type userType = {
  user: userProfile;
};
const UserProfilePage: React.FC<userType> = ({ user }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="container m-8 p-12  rounded-[10px] border-2  border-border">
      <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end ">
        <img
          src={user.image}
          alt={user.fname}
          className="w-32 h-32 mb-[-20px] rounded-[50%]"
        />
      </div>
      <Link to="/edit-user-profile">
        <img
          src={edit}
          alt="edit"
          loading="lazy"
          className={`w-8 h-8  curser-pointer bg-border  mt-[-20px]   py-2 rounded-full absolute ${
            i18n.language === "ar" ? "left-16 lg:left-60" : "right-16 lg:right-60"
          }`}
        />
      </Link>
      <div className="flex gap-8 flex-wrap justify-center mt-[50px] text-secondary">
        <Link className="hover:text-primary" to={user.links.x}>
          X
        </Link>
        <Link className="hover:text-primary" to={user.links.linkedin}>
          Linkedin
        </Link>
        <Link className="hover:text-primary" to={user.links.youtube}>
          Youtube
        </Link>
        <Link className="hover:text-primary" to={user.links.facebook}>
          Facebook
        </Link>
      </div>
      <div className=" ml-[10%] lg:ml-[25%] flex flex-col m-auto justify-center">
        <div className="flex gap-8 md:gap-80  flex-wrap my-8">
          <div>
            <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
              {t("profile.First Name")}
            </h1>
            <p>{user.fname}</p>
          </div>
          <div>
            <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
              {t("profile.Last Name")}
            </h1>
            <p>{user.lname}</p>
          </div>
        </div>

        <div className="my-8">
          <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
            {t("profile.Headline")}
          </h1>
          <p>{user.headline}</p>
        </div>
        <div className="">
          <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
            {t("profile.About")}
          </h1>
          <p>{user.about}</p>
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
