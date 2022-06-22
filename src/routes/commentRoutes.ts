import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware";
import commentController from "../controllers/commentController";

const router = Router()

router.post('/comment', authMiddleware, commentController.create)

router.delete('/comment/:id', authMiddleware, commentController.delete)


export default router;