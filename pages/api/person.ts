// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectID } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, searchDocumentByEmail } from "../../common/db";
import { Person } from "../../models/person";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Bad request" });
  }
  else {
    const data = req.body;
    const client = await connectToDb();
    const personRaw = await searchDocumentByEmail(client, 'person', data.email);

    const person = {
      id: personRaw._id,
      ...personRaw
    }
    console.log(person);
    res.status(200).json(person);
  }
}
