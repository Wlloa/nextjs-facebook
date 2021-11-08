import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isValidPassword } from "../../../common/utils";
import { db, getUsers } from "../../../firebase";
import { Person } from "../../../models/person";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 1 day expiration session
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials: Person, req: NextApiRequest) {
        const data = await getUsers(credentials.email);

        if (!data) {
          throw new Error("No user found");
        }
        const userId = Object.keys(data)[0];
        const person = { ...data[userId], id: userId };
        console.log(person);

        const isValid = await isValidPassword(
          person.password,
          credentials.password
        );

        if (!isValid) {
          throw new Error("Wrong password");
        }
        return { email: credentials.email };
      },
    }),
  ],
});
