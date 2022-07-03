import {Router} from "express";
import userController from "../controllers/userController";
import userUpdateValidateMiddleware from "../middleware/userUpdateValidateMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware";

const router = Router()

router.patch(
    '/user',
    [authMiddleware, fileUploadMiddleware.single('avatar'), userUpdateValidateMiddleware],
    userController.update
)

router.get('/user/:id', authMiddleware, userController.getOne)

router.get('/users', authMiddleware, userController.getAllUsers)

router.get('/users/search', authMiddleware, userController.getSearchResult)

export default router;