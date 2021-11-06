import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import createUserName, { hashPassword } from "../../../common/utils";
import { db } from "../../../firebase";
import { Person } from "../../../models/person";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: Person = req.body;

    const hashedPass = await hashPassword(data.password);
    const newPerson: Person = {
      ...data,
      password: hashedPass,
      image: null,
      posts: null,
      wallImage: null,
      friends: null,
      userName: createUserName(data.firstName, data.lastName),
    };

    const q = query(collection(db, "users"), where("email", "==", data.email));
    const duplicates = await getDocs(q);

    //check first if the user exist in our system
    // const duplicates = await readDocs('users', ['email', data.email])
    // console.log(duplicates.docs);

    if (duplicates.docs.length) {
      res
        .status(422)
        .json({ message: `Already exists an account under ${data.email}` });
      return;
    }

    const document = await addDoc(collection(db, "users"), newPerson);

    // const docRef = await createDoc("users", newPerson);
    
    res.status(201).json(document);
  }
};

export default handler;
