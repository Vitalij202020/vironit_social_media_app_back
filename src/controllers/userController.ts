import {Request, Response} from "express";
import UserModel from "../models/userModel";

const userController = {
    update: async (req: Request, res: Response) => {
        try {
            const { nickName, firstName, lastName, email, dateOfBirth, sex } = req.body
            const isEmailExist = await UserModel.findOne({email});
            if (isEmailExist && isEmailExist.email !== email) {
                return res.status(400).json({msg: `User with this ${email} email already exist!`})
            }
            const isNickNameExist = await UserModel.findOne({nickName});
            if (isNickNameExist && isNickNameExist.nickName !== nickName) {
                return res.status(400).json({msg: `User with this ${nickName} nickname already exist!`})
            }
            await UserModel.findOneAndUpdate({_id: req.body.user._id}, {
                nickName, firstName, lastName, email, dateOfBirth, sex
            })
            return res.json({msg: `${nickName} Successfully Updated!`})
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
    }
}

export default userController;