import {Router} from "express";
import userController from "../controllers/userController";
import userUpdateValidateMiddleware from "../middleware/userUpdateValidateMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.patch('/user', [userUpdateValidateMiddleware, authMiddleware], userController.update)

router.get('/user/:id', authMiddleware, userController.getOne)


export default router;