import express from "express";
import userController from '../controllers/userController.js'
import { authenticate } from "../middleware/auth.js";


const router = express.Router()

router.route('/refresh_token')
	.post(userController.refreshToken)

router.route('/login')
	.post(userController.loginUser)

router.route('/register')
	.post(userController.registerUser)


router.route('/logout')
	.get(userController.logoutUser)


export default router