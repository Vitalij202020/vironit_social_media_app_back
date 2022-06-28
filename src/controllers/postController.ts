import {Request, Response} from "express";
import PostModel from "../models/postModel";
import CommentModel from "../models/commentModel";


const postController = {
    create: async (req: Request, res: Response) => {
        try {
            const newPost = await PostModel.create({
                title: req.body.title,
                description: req.body.description,
                image: req.file
                    ? `${process.env.BASE_URL}/static/images/${req.file?.filename}`
                    : 'https://3.bp.blogspot.com/-Wdtjfs2hm9w/V33YW6LFPZI/AAAAAAAAaA8/KqBjOA4BBmkanB-TPslcsxkxvAcXpzNmwCLcB/s400/buyers_guide_-_abarth_500_2014_-_rear_quarter.jpg',
                user: req.user._id
            });
            return res.json({
                msg: 'Post Successfully Created!',
                post: {...newPost.toObject()},
                user: req.user
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const isPostExist = await PostModel.findById(req.body._id)
            if(!isPostExist) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            const updatedPost = await PostModel.findOneAndUpdate({_id: req.body._id}, {
                title: req.body.title,
                description: req.body.description,
                image: req.file
                    ? `${process.env.BASE_URL}/static/images/${req.file?.filename}`
                    : isPostExist.image
            }, {new: true})
            return res.json({
                msg: 'Post Successfully Updated!',
                post: {...updatedPost?.toObject()},
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const post = await PostModel.findOneAndDelete({_id: req.params.id})
            if(!post) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            await CommentModel.deleteMany({_id: {$in: post.comments}})
            return res.json({msg: 'Post Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAll: async (req: Request, res: Response) => {
        try {
            const allPosts = await PostModel.find({}, null, {sort: '-createdAt'}).populate('user comments').populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
            return res.json(allPosts)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllMyPosts: async (req: Request, res: Response) => {
        try {
            const allMyPosts = await PostModel.find({user: req.user._id}, null, {sort: '-createdAt'}).populate('user comments').populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password'
                }
            })
            return res.json(allMyPosts)
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