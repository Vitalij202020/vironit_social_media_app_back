import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware";
import conversationController from "../controllers/conversationController";

const router = Router()

router.get('/conversations', authMiddleware, conversationController.getConversations)

router.delete('/conversation/:id', authMiddleware, conversationController.deleteConversation)

export default router;