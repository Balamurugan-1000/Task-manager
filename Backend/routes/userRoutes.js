import express from "express";
import userController from '../controllers/userController.js'
const router = express.Router()
router.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUsers)
	.patch(userController.updateUsers)
	.delete(userController.deleteUsers)

export default router