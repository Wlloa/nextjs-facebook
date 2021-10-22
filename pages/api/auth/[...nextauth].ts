import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isValidElement } from "react";
import { connectToDb } from "../../../common/db";
import { isValidPassword } from "../../../common/utils";
import { Person } from "../../../models/person";

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 1 day expiration session
  },
  providers: [
    CredentialsProvider({
      //@ts-ignore
      async authorize(credentials: Person, req: NextApiRequest) {
        const client = await connectToDb();
        const personCollection = client.db().collection("person");
        const person = await personCollection.findOne({
          email: credentials.email,
        });
        if (!person) {
          throw new Error("No user found");
        }

        const isValid = await isValidPassword(
          person.password,
          credentials.password
        );

        if (!isValid) {
          throw new Error("Wrong password");
        }
        client.close();
        return { email: credentials.email };
      },
    }),
  ],
});
