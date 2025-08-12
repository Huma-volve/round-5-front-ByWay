import profile from "../assets/images/icons/profile.svg";
export interface userProfile {
  id?: number;
  image: string;
  fname: string;
  lname: string;
  headline: string;
  about: string;
  links: { x: string; linkedin: string; youtube: string; facebook: string };
}

const USER_PROFILE: userProfile[] = [
  {
    id: 1,
    image: profile ,
    fname: "Omnya",
    lname: "Mohamed",
    headline: "A student passionate about learning design and user experience.",
    about: "UI UX Design",
    links: {
      x: "https://twitter.com/yourusername",
      linkedin: "https://www.linkedin.com/in/yourusername",
      youtube: "https://www.youtube.com/@yourchannelname",
      facebook: "https://www.facebook.com/yourusername",
    },
  },
];
export default USER_PROFILE;
