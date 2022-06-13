import {Router} from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.route('/posts')
    .post(authMiddleware, postController.create)
    .get(authMiddleware, postController.getAll)

router.patch('/post/:id/like', authMiddleware, postController.addLike)

router.patch('/post/:id/unlike', authMiddleware, postController.removeLike)

export default router;