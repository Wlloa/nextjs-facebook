// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query, where } from "firebase/firestore";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db, getUsers, updateUser, uploadImage } from "../../firebase";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = req.query.email;
    const personData = await getUsers(String(data));

    if (!personData) {
      res.status(404).json({ message: "Not Found user" });
    }
    const personId = Object.keys(personData)[0];
    const personRaw = { ...personData[personId], id: personId };

    res.status(201).json(personRaw);
  } else if (req.method === "PUT") {
    //Update profile
    // 1. Obtain the user through user session
    // 2. Obtain user Id from firebase
    // 3. Upload image to firebase storage with userId as path
    // 4. Update user's image field with the image'url in firebase storage
    const session = await getSession({ req: req });
    const personData = await getUsers(session.user.email);
    const personId = Object.keys(personData)[0];
    const personRaw = { ...personData[personId], id: personId };

    const form = new formidable.IncomingForm({ keepExtensions: true });
    let imagePath;
    form.parse(req, async (err, fields, files) => {
      const image = saveFile(files.profilePic);
      imagePath = await uploadImage(image, personId);
      if (imagePath) {
        personRaw.image = imagePath;
        updateUser(personRaw);
        res.status(201).json({ message: "ok" });
      }
    });
    
  } else {
    res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = (file) => {
  console.log(file.filepath);
  const data = fs.readFileSync(file.filepath);
  return data;
};
