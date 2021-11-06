export interface Person {
  _id?: string;           //this is done because mongoDb
  firstName: string;
  lastName: string;
  userName?: string;
  email: string;
  password: string;
  birthday?: string;
  gender?: string;
  image?: {};
  wallImage?: {};
  friends?: string[];
  posts?: string[];
}
