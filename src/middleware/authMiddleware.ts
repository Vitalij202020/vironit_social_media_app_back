import {Response, NextFunction, Request} from 'express'
import Users, {UserModel} from '../models/userModel'
import jwt from 'jsonwebtoken'

interface IDecodedToken {
    id?: string;
}

export interface IAuthRequest extends Request {
    user?: UserModel
}

const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        const name = token?.split(' ')[0]
        const cod = token?.split(' ')[1]

        if(name !== 'Bearer' || name === undefined) {
            return res.status(400).json({msg: "Invalid Authentication."})
        }
        if(!cod) {
            return res.status(400).json({msg: "Invalid Authentication."})
        }
        const decoded = <IDecodedToken>jwt.verify(cod, process.env.JWT_SECRET as string)
        if(!decoded) {
            return res.status(400).json({msg: "Invalid Authentication."})
        }
        const user = await Users.findOne({_id: decoded.id }).select("-password")
        if(!user) {
            return res.status(400).json({msg: "User does not exist."})
        }
        req.user = user;
        next()
    } catch (err: any) {
        return res.status(500).json({msg: err.message})
    }
}

export default authMiddleware;