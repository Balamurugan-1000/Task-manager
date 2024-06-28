import User from '../models/User.js'
import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'
import bcrypt, { hash } from 'bcrypt'


const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select('-password').lean()
	if (!users?.length) {
		return res.status(404).json({ message: 'No user not found' })
	}
	res.json(users)
})


const createUsers = asyncHandler(async (req, res) => {
	const { username, password, roles } = req.body

	if (!username || !password || !Array.isArray(roles) || !roles.length) {
		return res.status(400).json({ message: "All Fields are required" })
	}

	const duplicate = await User.findOne({ username }).lean().exec()
	if (duplicate) {
		return res.status(409).json({ message: 'Duplicate Username' })
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	const userObject = { username, password: hashedPassword, roles }

	const user = await User.create(userObject)

	if (user) {
		res.status(201).json({ message: `New user ${username} created` })
	} else {
		res.status(400).json({ message: 'Invalid user data' })

	}
})

const updateUsers = asyncHandler(async (req, res) => {
	const { id, username, roles, acive, password } = req.body

	if (!id || !username || !Array.isArray(roles) || !roles.length || typeof acive !== 'boolean') {
		res.status(400).json({ message: "All fields are required" })
	}

	const user = await User.findById(id).exec()

	if (!user) {
		res.status(404).json({ message: 'User not found' })
	}

	const duplicate = await User.findOne({ username }).lean().exec()
	if (duplicate && duplicate._id.toString() !== id) {
		return res.status(409).json({ message: `Duplicate username` })
	}

	user.username = username
	user.roles = roles
	user.active = acive
	if (password) {
		user.password = await bcrypt.hash(password, 10)
	}
	const updateUser = await user.save()

	res.json({ message: `Updated user ${username} successfully` })

})

const deleteUsers = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ message: 'User Id is required' })
	}

	const task = await Task.findOne({ user: id }).lean().exec()

	if (task) {
		res.status(400).json({ message: 'User has assigned tasks' })
	}

	const user = await User.findById(id).exec()

	if (!user) {
		res.status(404).json({ message: 'User not found' })
	}
	const result = await user.deleteOne()
	console.log(result)

	const reply = `Username : ${user.username} with Id ${user._id} is deleted`
	res.json(reply)
})







export default {
	getAllUsers,
	createUsers,
	updateUsers,
	deleteUsers
}