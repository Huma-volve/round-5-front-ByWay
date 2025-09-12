import type { EditProfileForm } from "@/types/EditForm";


export const getEditProfileDefaults = (profileData: any): EditProfileForm => ({
  first_name: profileData?.user?.first_name || "",
  last_name: profileData?.user?.last_name || "",
  email: profileData?.user?.email || "",
  bio: profileData?.bio || "",
  twitter_link: profileData?.user?.twitter_link || "",
  linkedin_link: profileData?.user?.linkedin_link || "",
  youtube_link: profileData?.user?.youtube_link || "",
  facebook_link: profileData?.user?.facebook_link || "",
});
