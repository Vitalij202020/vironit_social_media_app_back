import {Request, Response} from "express";
import ConversationModel from "../models/conversationModel";
import MessageModel from "../models/messageModel";

const messageController = {
    createMessage: async (req: Request, res: Response) => {
        try {
            const {sender, recipient, message} = req.body;
            if(!recipient || !message.trim()) {
                return res.status(400).json({msg: "Field Can't Be Empty!"})
            }
            const newConversation = await ConversationModel.findOneAndUpdate({
                $or: [
                    {recipients: [sender, recipient]},
                    {recipients: [recipient, sender]}
                ]
            }, {
                recipients: [sender, recipient],
                message
            }, {
                new: true,
                upsert: true
            })
            const newMessage = await MessageModel.create({
                conversation: newConversation._id,
                sender,
                recipient,
                message
            })
            return res.json({msg: 'Message Successfully Added!', id: newMessage._id})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteMessages: async (req: Request, res: Response) => {
        try {
            const message = await MessageModel.findOneAndDelete({_id: req.params.id, sender: req.user._id})
            if(!message) {
                return res.status(400).json({msg: "Message Not Found!"})
            }
            return res.json({msg: 'Messages Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getMessages: async (req: Request, res: Response) => {
        try {
            const messages = await MessageModel
                .find({
                    $or: [
                        {sender: req.user._id, recipient: req.params.id},
                        {sender: req.params.id, recipient: req.user._id}
                    ]
                }, null, {sort: 'createdAt'})
                .populate({path: 'sender recipient', select: '-password'})
            return res.json(messages)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getMessage: async (req: Request, res: Response) => {
        try {
            const message = await MessageModel
                .findById(req.params.id)
                .populate({path: 'sender recipient', select: '-password'})
            return res.json(message)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default messageController;