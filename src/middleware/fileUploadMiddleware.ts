import multer from "multer";
import {Request} from "express";
import { v4 as uuidv4 } from 'uuid';
import path from "path";


const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, 'public/images')
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null,uuidv4() + path.extname(file.originalname))
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: any) => {
    if (types.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)

    }
}

export default multer({storage, fileFilter})