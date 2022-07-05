import {NextFunction, Request, Response} from "express";
import userUpdateValidateModel from "../models/userUpdateValidateModel";


const userUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = userUpdateValidateModel.validate(req.body)
        if (error) {
            return res.status(400).json({msg: error.details[0].message})
        }
        next()
    } catch (err: any) {
        return res.status(500).json({msg: err.message})
    }
}

export default userUpdateValidation