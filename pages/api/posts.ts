import { async } from "@firebase/util";
import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getPosts } from "../../firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const post = req.body;
        console.log(post);
        const result = await createPost(post);
        const newPost = {...post, id: result}
        res.status(201).json({post: newPost});
    } else if(req.method === 'GET'){
        const id = req.query.id;
        const posts = await getPosts(String(id));
        console.log(posts);
        res.status(200).json({posts: posts});
    }
    else {
        res.status(404).send("Bad Request");
    }
}

export default handler;