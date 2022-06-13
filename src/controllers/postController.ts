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

    addLike: async (req: Request, res: Response) => {
        try {
            console.log("---post -id---", req.params.id)
            const post = await PostModel.find({_id: req.params.id, likes: req.body.user._id})
            console.log("---post---", post)
            if (post.length > 0) {
                return res.status(400).json({msg: "You Already Liked This Post!"})
            }
            const like = await PostModel.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.body.user._id}
            }, {new: true})
            console.log("---post -id---", req.params.id)
            console.log("---like---", like)
            if (!like) {
                return res.status(400).json({msg: "This Post Doesn't Exist"})
            }
            return res.json({msg: 'Successfully Liked Post!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    removeLike: async (req: Request, res: Response) => {
        try {
            const like = await PostModel.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.body.user._id}
            }, {new: true})
            console.log("---like---", like)
            if (!like) {
                return res.status(400).json({msg: "This Post Doesn't Exist"})
            }
            return res.json({msg: 'Successfully UnLiked Post!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default postController;