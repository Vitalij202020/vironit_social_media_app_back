import {Request, Response} from "express";
import UserModel from "../models/userModel";

const userController = {
    update: async (req: Request, res: Response) => {
        try {
            const { nickName, firstName, lastName, email, dateOfBirth, story } = req.body
            const isEmailExist = await UserModel.findOne({email});
            if (isEmailExist && !isEmailExist._id.equals(req.user._id)) {
                return res.status(400).json({msg: `User with this ${email} email already exist!`})
            }
            const isNickNameExist = await UserModel.findOne({nickName});
            if (isNickNameExist && !isNickNameExist._id.equals(req.user._id)) {
                return res.status(400).json({msg: `User with this ${nickName} nickname already exist!`})
            }
            const updatedUser = await UserModel.findOneAndUpdate({_id: req.user._id}, {
                nickName,
                firstName,
                lastName,
                email,
                dateOfBirth,
                story,
                avatar: req.file
                    ?`${process.env.BASE_URL}/static/images/${req.file?.filename}`
                    : 'https://alexeykrol.com/wp-content/uploads/2018/12/karolyn-fox-foto.1024x1024.jpg'
            }, {new: true})
            return res.json({
                msg: "Successfully Updated!",
                user: {...updatedUser?.toObject(), password: null}
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getOne: async (req: Request, res: Response) => {
        try {
            const user = await UserModel.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(400).json({msg: `User Doesn't Exist!`})
            }
            return res.json({user})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await UserModel.find({}).select('-password');
            if (!users) {
                return res.status(400).json({msg: `Users Not Found!!`});
            }
            const usersWithoutMe = users.filter(user => String(user._id) !== String(req.user._id));
            return res.json(usersWithoutMe)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getSearchResult: async (req: Request, res: Response) => {
        try {
            const users = await UserModel.find({nickName: {$regex: req.query.name}}).select('-password');
            const usersWithoutMe = users.filter(user => String(user._id) !== String(req.user._id));
            if (usersWithoutMe.length === 0) {
                return res.status(400).json({msg: `Users Not Found!!`});
            }
            return res.json(usersWithoutMe)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default userController;