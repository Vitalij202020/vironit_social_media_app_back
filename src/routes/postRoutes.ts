import {Router} from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";
import fileUploadMiddleware from "../middleware/fileUploadMiddleware";

const router = Router()

router.route('/post')
    .post(authMiddleware, fileUploadMiddleware.single('image'), postController.create)
    .patch(authMiddleware, fileUploadMiddleware.single('image'), postController.update)
    .get(authMiddleware, postController.getAll)

router.route('/post/:id')
    .get(authMiddleware, postController.getOne)
    .delete(authMiddleware, postController.delete)

router.get('/my/post/', authMiddleware, postController.getAllMyPosts)

router.patch('/post/:id/like', authMiddleware, postController.addLike)

router.patch('/post/:id/unlike', authMiddleware, postController.removeLike)

export default router;