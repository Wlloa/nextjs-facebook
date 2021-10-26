export interface Person {
  _id?: string;           //this is done because mongoDb
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday?: string;
  gender?: string;
  image?: string;
  wallImage?: string;
  friends?: string[];
  posts?: string[];
}
