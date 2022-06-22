import {Request, Response} from "express";
import PostModel from "../models/postModel";


const postController = {
    create: async (req: Request, res: Response) => {
        try {
            const newPost = await PostModel.create({
                content: req.body.content,
                image: req.file
                    ? `${process.env.BASE_URL}/static/images/${req.file?.filename}`
                    : 'https://3.bp.blogspot.com/-Wdtjfs2hm9w/V33YW6LFPZI/AAAAAAAAaA8/KqBjOA4BBmkanB-TPslcsxkxvAcXpzNmwCLcB/s400/buyers_guide_-_abarth_500_2014_-_rear_quarter.jpg',
                user: req.user._id
            });
            return res.json({
                msg: 'Post Successfully Created!',
                ...newPost.toObject(),
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const post = await PostModel.findById(req.params.id).populate('user likes')
            if(!post) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            return res.json(post)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const post = await PostModel.findById(req.params.id).populate('user likes')
            if(!post) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            return res.json(post)
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

    getOne: async (req: Request, res: Response) => {
        try {
            if(req.params.id.length !== 24) {
                return res.status(400).json({msg: "Wrong ID"})
            }
            const post = await PostModel.findById(req.params.id).populate('user likes')
            if(!post) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            return res.json(post)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    addLike: async (req: Request, res: Response) => {
        try {
            console.log("---post -id---", req.params.id)
            const post = await PostModel.find({_id: req.params.id, likes: req.user._id})
            console.log("---post---", post)
            if (post.length > 0) {
                return res.status(400).json({msg: "You Already Liked This Post!"})
            }
            const like = await PostModel.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
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
                $pull: {likes: req.user._id}
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