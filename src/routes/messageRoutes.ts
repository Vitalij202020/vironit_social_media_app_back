import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware";
import messageController from "../controllers/messageController";

const router = Router()

router.post('/message', authMiddleware, messageController.createMessage)

router.get('/messages/:id', authMiddleware, messageController.getMessages)

router.delete('/message/:id', authMiddleware, messageController.deleteMessages)


export default router;