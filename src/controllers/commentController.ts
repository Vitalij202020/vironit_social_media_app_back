import {Request, Response} from "express";
import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";


const commentController = {
    create: async (req: Request, res: Response) => {
        try {
            const {postId, content, postUserId} = req.body
            const post = await PostModel.findById(postId)
            if(!post) {
                return res.status(400).json({msg: "Post doesn't exist!"})
            }
            const newComment = await CommentModel.create({
                content,
                postId,
                postUserId,
                user: req.user._id
            });
            await PostModel.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new: true})

            return res.json({newComment})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const comment = await CommentModel.findOneAndDelete({_id: req.params.id})
            if(!comment) {
                return res.status(400).json({msg: "Comment doesn't exist!"})
            }
            console.log('---delete-comment---', comment)
            await PostModel.findOneAndUpdate({_id: comment?.postId}, {
                $pull: {comments: req.params.id}
            })
            return res.json({msg: 'Comment Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default commentController;