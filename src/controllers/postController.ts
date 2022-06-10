import {Request, Response} from "express";
import PostModel from "../models/postModel";
import {IAuthRequest} from "../middleware/authMiddleware";


const postController = {
    create: async (req: IAuthRequest, res: Response) => {
        try {
            const { content, images } = req.body
            // @ts-ignore
            const newPost = await PostModel.create({ ...req.body, user: req.user._id });
            return res.json({
                msg: 'Post Successfully Created!',
                ...newPost.toObject(),
                user: req.user
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