import {Request, Response} from "express";
import UserModel from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { nickName, firstName, lastName, email, dateOfBirth, sex, password } = req.body
            console.log("---up---register---", nickName)
            const isEmailExist = await UserModel.findOne({email});
            if (isEmailExist) {
                return res.status(400).json({msg: `User with this ${email} email already exist!`})
            }
            const isNickNameExist = await UserModel.findOne({nickName});
            if (isNickNameExist) {
                return res.status(400).json({msg: `User with this ${nickName} nickname already exist!`})
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const newUser = await UserModel.create({ ...req.body, password: hashPassword});
            console.log("---after---create---", newUser)
            return res.status(200).json({msg: `${newUser.nickName} Successfully Registered!`, id: newUser._id})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await UserModel.findOne({email});
            if (!user) {
                return res.status(400).json({msg: `Account with this ${email} email not exist!`})
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({msg: 'Wrong Password!'})
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                expiresIn: '24h',
            });
            return res.json({
                msg: `${user.nickName} Successfully Login!`,
                token,
                user: {...user.toObject(), password: null}
            })
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default authController;