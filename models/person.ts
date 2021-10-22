export interface Person {
  id?: string;
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
