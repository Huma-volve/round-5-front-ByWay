import favIcon from "../assets/react.svg";

export interface FavouriteItem {
  id: string | number;
  image: string;
  courseName: string;
  instractor: string;
}

export const FAVOURITE_DETAILES: FavouriteItem[] = [
  {
    id: 1,
    image: favIcon,
    courseName: "UI/UX Design",
    instractor: "By Omnia Ali",
  },
  {
    id: 2,
    image: favIcon,
    courseName: "Graphic Design",
    instractor: "By Amira Mohammed",
  },
  {
    id: 3,
    image: favIcon,
    courseName: "JavaScript",
    instractor: "By Omar Salah",
  },
];
