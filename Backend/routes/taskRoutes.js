import express from "express";
const router = express.Router()
import taskController from "../controllers/taskController.js";

router.route('/')
	.get(taskController.getAllTasks)
	.post(taskController.createNewTask)
	.patch(taskController.updateTask)
	.delete(taskController.deleteTask)


export default router