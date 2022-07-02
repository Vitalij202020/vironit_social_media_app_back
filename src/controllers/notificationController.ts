import {Request, Response} from "express";
import NotificationModel from "../models/notificationModel";

const notificationController = {
    createNotification: async (req: Request, res: Response) => {
        try {
            return res.json({msg: 'Comment Successfully Added!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteNotification: async (req: Request, res: Response) => {
        try {
            const notification = await  NotificationModel.findOneAndDelete({_id: req.params.id})
            if(!notification) {
                return res.status(400).json({msg: "Notification Doesn't Exists!"})
            }
            return res.json({msg: 'Notification Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserNotifications: async (req: Request, res: Response) => {
        try {
            const notifications = await NotificationModel
                .find({to: req.user._id})
                .populate('from to')
                .select('-password')
            return res.json(notifications)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default notificationController;