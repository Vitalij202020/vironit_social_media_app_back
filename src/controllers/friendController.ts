import {Request, Response} from "express";
import UserModel from "../models/userModel";
import FriendRequestModel from "../models/friendRequestModel";
import FriendshipModel from "../models/friendshipModel";
import NotificationModel from "../models/notificationModel";
import friendRequestModel from "../models/friendRequestModel";

const friendController = {
    sendFriendRequest: async (req: Request, res: Response) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.body.to;
            const content = req.body.content;
            const sender = await UserModel.findById(fromUserId)
            const receiver = await UserModel.findById(toUserId)
            if(fromUserId === toUserId) {
                return res.status(400).json({msg: "Users Have The Same ID"})
            }
            if(!sender || !receiver) {
                return res.status(400).json({msg: "User Not Found"})
            }
            const isRequestExists = await FriendRequestModel.findOne({
                $or: [
                    {
                        from: fromUserId,
                        to: toUserId,
                    },
                    {
                        to: fromUserId,
                        from: toUserId,
                    }
                ]
            })
            if(isRequestExists) {
                return res.status(400).json({msg: "Request Already Sent"})
            }
            const isFriendshipExists = await FriendshipModel.findOne({
                users: {$all: [fromUserId, toUserId]}
            })
            if(isFriendshipExists) {
                return res.status(400).json({msg: "This User is already Your Friend! "})
            }
            const friendRequest = await FriendRequestModel.create({
                from: fromUserId,
                to: toUserId
            });
            await NotificationModel.create({
                from: friendRequest.from,
                to: friendRequest.to,
                content
            });
            return res.json({msg: 'Friend Request Successfully Sent!', friendRequest})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getSentFriendRequests: async (req: Request, res: Response) => {
        try {
            const sentFriendRequests = await FriendRequestModel.find({from: {$all: [req.user._id]}})
            const answer = sentFriendRequests.map(item => {
               return String(item.to)
            })
            return res.json(answer)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    acceptFriendRequest: async (req: Request, res: Response) => {
        try {
            const friendRequest = await friendRequestModel.findOneAndDelete({
                $or: [
                    {from: req.user._id, to: req.params.id},
                    {from: req.params.id, to: req.user._id}
                ]
            })
            console.log('friendRequest----------->>>>>>>>>', friendRequest)
            if(!friendRequest) {
                return res.status(400).json({msg: "Request Not Found!"})
            }
            await FriendshipModel.create({users: [friendRequest.from, friendRequest.to]})
            await NotificationModel.findOneAndDelete({
                $or: [
                    {from: req.user._id, to: req.params.id},
                    {from: req.params.id, to: req.user._id}
                ]
            })
            await friendRequest.deleteOne();
            return res.json({msg: 'Congratulations, You Have A New Friend'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteFriendRequest: async (req: Request, res: Response) => {
        try {
            const friendRequest = await friendRequestModel.findOneAndDelete({
                $or: [
                    {from: req.user._id, to: req.params.id},
                    {from: req.params.id, to: req.user._id}
                ]
            })
            if(!friendRequest) {
                return res.status(400).json({msg: "Request Not Found!"})
            }
            await friendRequest.deleteOne();
            await NotificationModel.findOneAndDelete({
                $or: [
                    {from: req.user._id, to: req.params.id},
                    {from: req.params.id, to: req.user._id}
                ]
            })
            return res.json({msg: 'Friend Request Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserFriends: async (req: Request, res: Response) => {
        try {
            const friendships = await FriendshipModel
                .find({users: {$all: [req.params.userId]}})
                .populate([{path: 'users', model: 'User', select: '-password'}])
            const friends = friendships.map(friendship => {
                return friendship.users.find((user: any) => String(user._id) !== String(req.params.userId))
            })
            return res.json(friends)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteFriendship: async (req: Request, res: Response) => {
        try {
            await FriendshipModel.deleteOne({
                users: {$all: [req.params.id, req.user._id]}
            })
            return res.json({msg: 'Friendship Successfully Deleted!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
}

export default friendController;