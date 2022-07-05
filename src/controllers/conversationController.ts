import {Request, Response} from "express";
import ConversationModel from "../models/conversationModel";
import MessageModel from "../models/messageModel";

const conversationController = {
    deleteConversation: async (req: Request, res: Response) => {
        try {
            const conversation = await  ConversationModel.findOneAndDelete({
                $or: [
                    {recipients: [req.user._id, req.params.id]},
                    {recipients: [req.params.id, req.user._id]}
                ]
            })
            if(!conversation) {
                return res.status(400).json({msg: "Conversation Doesn't Exists!"})
            }
            await MessageModel.deleteMany({conversation: conversation._id})
            return res.json({msg: 'Conversation Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getConversations: async (req: Request, res: Response) => {
        try {
            const conversations = await ConversationModel
                .find({recipients: req.user._id}, null, {sort: '-updatedAt'})
                .populate({path: 'recipients', select: '-password'})
            return res.json(conversations)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default conversationController;