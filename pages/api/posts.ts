import { async } from "@firebase/util";
import { NextApiRequest, NextApiResponse } from "next";
import { createPost } from "../../firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const post = req.body;
        console.log(post);
        const result = await createPost(post);
        const newPost = {...post, id: result}
        res.status(201).json({post: newPost});
    } else if(req.method === 'GET'){

    }
    else {
        res.status(404).send("Bad Request");
    }
}

export default handler;