// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query, where } from "firebase/firestore";
import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";

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
    const q = query(
      collection(db, "users"),
      where("email", "==", String(data))
    );
    const personData = await getDocs(q);

    if (!personData.docs.length) {
      res.status(404).json({ message: "Not Found user" });
    }
    const personRaw = personData.docs[0].data();
    // console.log(data);
    //const personCollection = await readDocs("users", String(data))
    // personCollection.forEach((doc)=> {
    //   console.log(doc.id, " => ", doc.data());
    // })
    //const personRaw = personCollection.docs[0].data();
    //console.log("test GET", personRaw);
    // const client = await connectToDb();
    // const personRaw = await searchDocumentByEmail(client, "person", String(data));
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
