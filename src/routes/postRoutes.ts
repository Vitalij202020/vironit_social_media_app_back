import {Router} from "express";
import postController from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router()

router.route('/posts')
    .post(authMiddleware, postController.create)
    .get(authMiddleware, postController.getAll)


export default router;