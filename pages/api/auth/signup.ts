import { NextApiRequest, NextApiResponse } from "next";
import {
  connectToDb,
  DuplicateDocumentException,
  insertDocument,
  searchDocumentByEmail,
} from "../../../common/db";
import { hashPassword } from "../../../common/utils";
import { Person } from "../../../models/person";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    const data: Person = req.body;

    const hashedPass = await hashPassword(data.password);
    const newPerson: Person = { 
      ...data, 
      password: hashedPass,
      image: null,
      posts: undefined,
      wallImage: null,
      friends: undefined 
    };
    const client = await connectToDb();

    //check first if the user exist in our system
    const duplicate = await searchDocumentByEmail(client, "person", data.email);
    console.log(duplicate);
    if (duplicate) {
      client.close();
      res
        .status(422)
        .json({ message: `Already exists an account under ${data.email}` });
      return;
    }

    const resp = await insertDocument(client, "person", newPerson);
    res.status(201).json({ message: "Created Person!!!" });
    client.close();
  }
};

export default handler;
