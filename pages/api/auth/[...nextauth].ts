import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isValidPassword } from "../../../common/utils";
import { db } from "../../../firebase";
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
        const q = query(collection(db, "users"), where("email", "==", credentials.email));
        const data = await getDocs(q);
        if (!data.docs[0].exists()) {
          throw new Error("No user found");
        }
        const person = data.docs[0].data();

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
