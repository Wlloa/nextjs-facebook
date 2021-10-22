import { IPost } from "./post";

export interface IHistory extends Required<Omit<IPost, "date" | "description">> {}

export const HISTORIES: IHistory[] = [
  {
    id: "1",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
  {
    id: "2",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
  {
    id: "3",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
  {
    id: "4",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
  {
    id: "5",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
  {
    id: "6",
    userName: "Wil",
    userPicture: "/static/miscellanea/me.jpg",
    postPicture: "/static/miscellanea/fra-bel.jpg",
  },
];
