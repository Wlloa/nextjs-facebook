import { IPost } from "./post";

export interface IHistory
  extends Required<
    Omit<IPost, "date" | "description" | "timestamp" | "user">
  > {}

export const HISTORIES: IHistory[] = [
  {
    id: "1",
    userName: "Wil",
    userImage: "/static/miscellanea/CAPTAINMARVEL_profile.jpg",
    postPicture: "/static/miscellanea/captainmarve.jpg",
  },
  {
    id: "2",
    userName: "Wil",
    userImage: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/black-widow.jpg",
  },
  {
    id: "3",
    userName: "Wil",
    userImage: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/CAPTAINMARVEL_profile.jpg",
  },
  {
    id: "4",
    userName: "Wil",
    userImage: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/benzema.jpg",
  },
  {
    id: "5",
    userName: "Wil",
    userImage: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/setuup.jpg",
  },
];
