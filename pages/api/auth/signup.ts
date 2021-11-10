import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import createUserName, { hashPassword } from "../../../common/utils";
import { createUser, db, getUsers } from "../../../firebase";
import { Person } from "../../../models/person";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: Person = req.body;

    const hashedPass = await hashPassword(data.password);
    const newPerson: Person = {
      ...data,
      password: hashedPass,
      image: "/static/miscellanea/empty-profile.png",
      posts: null,
      wallImage: null,
      friends: null,
      userName: createUserName(data.firstName, data.lastName),
    };
    console.log(data.email);
    const users = await getUsers(data.email);
    console.log(users);
    
    if (users) {
      res
        .status(422)
        .json({ message: `Already exists an account under ${data.email}` });
      return;
    }
    
    const result = await createUser(newPerson);

    res.status(201).json({ message: users });
  }
};

export default handler;
