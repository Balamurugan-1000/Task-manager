import User from '../models/User.js'
import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'


const getAllTasks = asyncHandler(async (req, res) => {
	const tasks = await Task.find()
	if (!tasks?.length) {
		return res.status(404).json({ message: 'No tasks found' })
	}
	res.json(tasks)
})


const createNewTask = asyncHandler(async (req, res) => {
	const { AssignedTo, title, description, status, priority, DueDate } = req.body
	if (!AssignedTo, !title, !description, !status, !priority, !DueDate) {
		res.status(409).json({ message: 'All fields are required' })
	}


	const duplicate = await Task.findOne({ title })
	if (duplicate) {
		return res.status(400).json({ message: 'Duplicate Task found' })
	}


	const userData = await User.findById(AssignedTo).lean().exec()
	if (!userData) {
		return res.status(404).json({ message: "User not found" })
	}


	const taskObject = {
		AssignedTo, title, description, status, priority, DueDate
	}

	const task = await Task.create(taskObject)
	if (task) {
		res.status(201).json({ message: `Task ${title} was created successfully` })
	} else {
		res.status(400).json({ message: 'invalid Task data' })
	}
})

const updateTask = asyncHandler(async (req, res) => {
	const { id, AssignedTo, title, description, status, priority, DueDate } = req.body

	if (!AssignedTo, !title, !description, !status, !priority, !DueDate, !id) {
		res.status(409).json({ message: 'All fields are required' })
	}

	// Confirm task exists to update
	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({ message: 'Task not found' })
	}
	const userData = User.findById(AssignedTo).lean().exec()
	if (!userData) {
		return res.status(404).json({ message: "The given User not found" })
	}



	task.AssignedTo = AssignedTo
	task.title = title
	task.description = description
	task.status = status
	task.priority = priority
	task.DueDate = DueDate


	const updatedTask = await task.save()

	res.json(`'${updatedTask.title}' updated`)
})


const deleteTask = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ message: 'Task ID required' })
	}


	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({ message: 'Task not found' })
	}

	const result = await task.deleteOne()

	const reply = `Task '${task.title}' with ID ${task._id} deleted`

	res.json(reply)
})


export default {
	createNewTask, updateTask, deleteTask, getAllTasks
}