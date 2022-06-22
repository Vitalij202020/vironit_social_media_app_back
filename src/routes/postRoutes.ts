import {Router} from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware";

const router = Router()

router.route('/post')
    .post(authMiddleware, fileUploadMiddleware.single('image'), postController.create)
    .get(authMiddleware, postController.getAll)

router.route('/post/:id')
    .post(authMiddleware, fileUploadMiddleware.single('image'), postController.update)
    .get(authMiddleware, postController.getOne)
    .delete(authMiddleware, postController.delete)

router.patch('/post/:id/like', authMiddleware, postController.addLike)

router.patch('/post/:id/unlike', authMiddleware, postController.removeLike)

export default router;