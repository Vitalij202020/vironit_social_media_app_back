import {Request, Response} from "express";
import PostModel from "../models/postModel";


const postController = {
    create: async (req: Request, res: Response) => {
        try {
            const { content, images } = req.body
            const newPost = await PostModel.create({ ...req.body});
            return res.json({
                msg: 'Post Successfully Created!',
                ...newPost.toObject(),
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAll: async (req: Request, res: Response) => {
        try {
            const allPosts = await PostModel.find().populate('user')
            return res.json(allPosts)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default postController;