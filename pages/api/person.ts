// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query, where } from "firebase/firestore";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, getUsers } from "../../firebase";

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
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      await saveFile(files.profilePic);
    });
    res.status(201).json({ message: "ok" });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file) => {
  console.log(file.filepath);
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.newFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};
