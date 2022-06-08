import {Request, Response} from "express";
import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';


const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { nickName, firstName, lastName, email, dateOfBirth, sex, password } = req.body
            console.log("---up---register---", nickName)
            const isEmailExist = await UserModel.findOne({email});
            if (isEmailExist) {
                return res.status(400).json({msg: `User with this ${email} email already exists!`})
            }
            const isNickNameExist = await UserModel.findOne({nickName});
            if (isNickNameExist) {
                return res.status(400).json({msg: `User with this ${nickName} nickname already exists!`})
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const newUser = await UserModel.create({ ...req.body, password: hashPassword});
            console.log("---after---create---", newUser)
            return res.status(200).json({msg: `${newUser.nickName} Successfully Registered!`, id: newUser._id})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default authController;