import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware";
import friendController from "../controllers/friendController";

const router = Router()

router.route('/friend')
    .get(authMiddleware, friendController.getSentFriendRequests)
    .post(authMiddleware, friendController.sendFriendRequest)

router.delete('/friend/:id', authMiddleware, friendController.deleteFriendRequest)

router.delete('/friend/:id/accept', authMiddleware, friendController.acceptFriendRequest)

router.get('/friends/:userId/', authMiddleware, friendController.getUserFriends)

router.delete('/friend/delete/:id', authMiddleware, friendController.deleteFriendship)

export default router;