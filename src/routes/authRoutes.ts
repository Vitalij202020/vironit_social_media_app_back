import {Router} from "express";
import authController from "../controllers/authController";
import registerValidateMiddleware from "../middleware/registerValidateMiddleware";
import loginValidateMiddleware from "../middleware/loginValidateMiddleware";

const router = Router()

router.post('/register', registerValidateMiddleware, authController.register)

router.post('/login', loginValidateMiddleware, authController.login)

export default router;