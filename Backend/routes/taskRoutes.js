import express from "express";
const router = express.Router()
import taskController from "../controllers/taskController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

router.route('/')
	.get(authenticate, authorizeAdmin, taskController.getAllTasks)
	.post(authenticate, authorizeAdmin, taskController.createNewTask)
	.patch(authenticate, authorizeAdmin, taskController.updateTask)
	.delete(authenticate, authorizeAdmin, taskController.deleteTask)



router.route('/:taskId')
	.get(authenticate, authorizeAdmin, taskController.getTaskById)

router.route('/group/:groupId')
	.get(authenticate, authorizeAdmin, taskController.getTasksByGroup)

router.route('/user/:userId')
	.get(authenticate, authorizeAdmin, taskController.getTasksByUser)


router.route('/group/:groupId/task/:taskId')
	.post(authenticate, authorizeAdmin, taskController.addNewTaskToGroup)
	.delete(authenticate, authorizeAdmin, taskController.removeTaskFromGroup)








export default router