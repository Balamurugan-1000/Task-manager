import express from "express";
import userController from '../controllers/userController.js'
import { authenticate } from "../middleware/auth.js";
import { authorizeAdmin } from '../middleware/auth.js'

const router = express.Router()
router.route('/:company')
	.get(authenticate, authorizeAdmin, userController.getAllUsers)


router.route('/:id')
	.patch(authenticate, userController.updateUsers)
	.delete(authenticate, authorizeAdmin, userController.deleteUsers)
router.route('/getEmployees')
	.get(authenticate, authorizeAdmin, userController.getEmployees)

router.route('/createEmployee')
	.post(authenticate, authorizeAdmin, userController.createEmployeeByAdmin)



export default router