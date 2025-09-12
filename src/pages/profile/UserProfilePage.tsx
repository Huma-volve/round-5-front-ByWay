import { type userProfile } from "@/data/userProfile";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import edit from "../../assets/images/icons/edit.svg";
import profile from "../../assets/images/icons/profile.svg";
import { useFetchUserProfile } from "@/hooks/learner-profile";
import ProfileLoading from "@/components/user-profile/ProfileLoading";

const UserProfilePage = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useFetchUserProfile();

  const user = (data ?? null) as userProfile | null;
  console.log({user});
  const twitter = user?.twitter_link || "";
  const linkedin = user?.linkedin_link || "";
  const youtube = user?.youtube_link || "";
  const facebook = user?.facebook_link || "";

  if (isLoading) return <ProfileLoading/>

  return (
    <div className="container m-8 p-12  rounded-[10px] border-2  border-border">
      <div className="bg-[#F8FAFC] h-[175px] flex justify-center items-end ">
        <img
          src={user?.image || profile}
          alt={user?.first_name}
          className="w-32 h-32 mb-[-20px] rounded-[50%]"
        />
      </div>
      <Link to="/edit-user-profile">
        <img
          src={edit}
          alt="edit"
          loading="lazy"
          className={`w-8 h-8  curser-pointer bg-border  mt-[-20px]   py-2 rounded-full absolute ${i18n.language === "ar" ? "left-[15%] " : "right-[15%] "
            }`}
        />
      </Link>
      <div className="flex gap-8 flex-wrap justify-center mt-[50px] text-secondary">
        <Link className="hover:text-primary" to={twitter}>
          {t("profile.X(Formerly twitter)")}
        </Link>
        <Link className="hover:text-primary" to={linkedin}>
          {t("profile.Linkedin")}
        </Link>
        <Link className="hover:text-primary" to={youtube}>
          {t("profile.Youtube")}
        </Link>
        <Link className="hover:text-primary" to={facebook}>
          {t("profile.Facebook")}
        </Link>
      </div>
      <div className=" ml-[10%] lg:ml-[25%] flex flex-col m-auto justify-center">
        <div className="flex gap-8 md:gap-80  flex-wrap my-8">
          <div>
            <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
              {t("profile.First Name")}
            </h1>
            <p>{user?.first_name}</p>
          </div>
          <div>
            <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
              {t("profile.Last Name")}
            </h1>
            <p>{user?.last_name}</p>
          </div>
        </div>

        <div className="my-8">
          <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
            {t("profile.Headline")}
          </h1>
          <p>{user?.headline}</p>
        </div>
        <div className="">
          <h1 className="text-primary text-[17px] md:text-[20px] font-bold mb-2">
            {t("profile.About")}
          </h1>
          <p>{user?.about}</p>
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
