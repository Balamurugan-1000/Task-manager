import User from '../models/User.js'
import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'


const getAllTasks = asyncHandler(async (req, res) => {
	console.log('get all tasks')
	const tasks = await Task.find()
	if (!tasks?.length) {
		return res.status(404).json({
			success: true,
			message: 'No tasks found'
		})
	}
	res.json(tasks)
})


const createNewTask = asyncHandler(async (req, res) => {
	const { AssignedTo, title, description, status, priority, DueDate } = req.body
	if (!AssignedTo, !title, !description, !status, !priority, !DueDate) {
		res.status(409).json({
			success: false,
			message: 'All fields are required'
		})
	}


	const duplicate = await Task.findOne({ title })
	if (duplicate) {
		return res.status(400).json({
			success: false,
			message: 'Duplicate Task found'
		})
	}


	const userData = await User.findById(AssignedTo).lean().exec()
	if (!userData) {
		return res.status(404).json({
			success: false,
			message: "User not found"
		})
	}


	const taskObject = {
		AssignedTo, title, description, status, priority, DueDate
	}

	const task = await Task.create(taskObject)
	if (task) {
		res.status(201).json({
			success: true,
			message: `Task ${title} was created successfully`
		})
	} else {
		res.status(400).json({
			success: false,
			message: 'invalid Task data'
		})
	}
})

const updateTask = asyncHandler(async (req, res) => {
	const { id, AssignedTo, title, description, status, priority, DueDate } = req.body

	if (!AssignedTo, !title, !description, !status, !priority, !DueDate, !id) {
		res.status(409).json({
			success: false,
			message: 'All fields are required'
		})
	}

	// Confirm task exists to update
	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({
			success: false,
			message: 'Task not found'
		})
	}
	const userData = User.findById(AssignedTo).lean().exec()
	if (!userData) {
		return res.status(404).json({
			success: false,
			message: "The given User not found"
		})
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
		return res.status(400).json({

			message: 'Task ID required'
		})
	}


	const task = await Task.findById(id).exec()

	if (!task) {
		return res.status(400).json({
			success: false,
			message: 'Task not found'
		})
	}

	const result = await task.deleteOne()

	const reply = `Task '${task.title}' with ID ${task._id} deleted`

	res.json(reply)
})

const getTaskById = asyncHandler(async (req, res) => {
	const { id } = req.params

	if (!id) {
		return res.status(400).json({
			success: false,
			message: 'Task ID required'
		})
	}

	const task = await Task
		.findById(id)
		.populate('AssignedTo')
		.exec()

	if (!task) {
		return res.status(400).json({
			success: false,
			message: 'Task not found'
		})
	}

	res.json(task)

})


const addNewTaskToGroup = asyncHandler(async (req, res) => {
	const { id, groupId } = req.body

	if (!id || !groupId) {
		return res.status(400).json({
			success: false,
			message: 'Task ID and Group ID required'
		})
	}

	const task = await Task.findById(id).exec()
	if (!task) {
		return res.status(400).json({
			success: false,
			message: 'Task not found'
		})
	}

	const group = await Group.findById(groupId).exec()

	if (!group) {
		return res.status(400).json({
			success: false,
			message: 'Group not found'
		})
	}

	group.tasks.push(id)

	const updatedGroup = await group.save()


	res.json({
		success: true,
		message: `Task '${task.title}' added to Group '${group.name}'`
	})

})

const removeTaskFromGroup = asyncHandler(async (req, res) => {
	const { id, groupId } = req.body

	if (!id || !groupId) {
		return res.status(400).json({
			success: false,
			message: 'Task ID and Group ID required'
		})
	}

	const task = await Task
		.findById(id)
		.populate('group')
		.exec()

	if (!task) {
		return res.status(400).json({
			success: false,
			message: 'Task not found'
		})
	}

	const group = await Group
		.findById(groupId)
		.populate('tasks')
		.exec()

	if (!group) {
		return res.status(400).json({
			success: false,
			message: 'Group not found'
		})
	}

	const index = group.tasks.indexOf(id)
	if (index > -1) {
		group.tasks.splice(index, 1)
	}

	const updatedGroup = await group.save()

	res.json(`Task '${task.title}' removed from Group '${group.name}'`)




})

const getTasksByGroup = asyncHandler(async (req, res) => {
	const { groupId } = req.params

	if (!groupId) {
		return res.status(400).json({
			success: false,
			message: 'Group ID required'
		})
	}

	const group = await Group
		.findById(groupId)
		.populate('tasks')
		.exec()

	if (!group) {
		return res.status(400).json({
			success: false,
			message: 'Group not found'
		})
	}

	res.json(group.tasks)

})


const getTasksByUser = asyncHandler(async (req, res) => {
	const { userId } = req.params

	if (!userId) {
		return res.status(400).json({
			success: false,
			message: 'User ID required'
		})
	}

	const user = await User
		.findById(userId)
		.populate('tasks')
		.exec()


	if (!user) {
		return res.status(400).json({
			success: false,
			message: 'User not found'
		})
	}


	res.json(user.tasks)


})

export default {
	createNewTask, updateTask, deleteTask, getAllTasks, getTaskById, addNewTaskToGroup, removeTaskFromGroup, getTasksByGroup, getTasksByUser
}