import registerValidateModel from "../models/registerValidateModel";
import {NextFunction, Request, Response} from "express";


 const registerValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = registerValidateModel.validate(req.body)
        if (error) {
            return res.status(400).json({msg: error.details[0].message})
        }
        next()
    } catch (err: any) {
        return res.status(500).json({msg: err.message})
    }
}

export default registerValidation