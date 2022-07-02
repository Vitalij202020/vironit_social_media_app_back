import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware";
import notificationController from "../controllers/notificationController";

const router = Router()

router.route('/notification')
    .get(authMiddleware, notificationController.getUserNotifications)
    .post(authMiddleware, notificationController.createNotification)

router.delete('/notification/:id', authMiddleware, notificationController.deleteNotification)

export default router;