import User from '../models/User.js'
import Task from '../models/Task.js'
import asyncHandler from 'express-async-handler'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { generateAccessToken, generateRefreshToken } from "../utils/createToken.js";
import { is } from 'date-fns/locale'

const getAllUsers = asyncHandler(async (req, res) => {
	const { company } = req.params
	const users = await User.find({ company }).populate('tasks').select('-password').lean().exec()

	res.json(users)
})



const updateUsers = asyncHandler(async (req, res) => {
	const { id } = req.params
	const { username, roles, active, password } = req.body

	if (!id) {
		return res.status(400).json({
			success: false,
			message: 'User Id is required'
		})
	}
	if (!username) {
		return res.status(400).json({
			success: false,
			message: 'Username is required'
		})
	}
	if (!roles) {
		return res.status(400).json({
			success: false,
			message: 'Roles is required'
		})
	}
	if (!active) {
		return res.status(400).json({
			success: false,
			message: 'Active is required'
		})
	}


	const user = await User.findById(id).exec()

	if (!user) {
		res.status(404).json({
			success: false,
			message: 'User not found'
		})
	}

	const duplicate = await User.findOne({ username }).lean().exec()
	if (duplicate && duplicate._id.toString() !== id) {
		return res.status(409).json({
			success: false,
			message: `Duplicate username`
		})
	}

	user.username = username
	user.roles = roles === 'Admin' ? 5000 : 1999
	user.active = active
	if (password) {
		user.password = await bcrypt.hash(password, 10)
	}
	const updateUser = await user.save()
	console.log(updateUser)

	res.json({
		success: true,
		message: `Updated user ${username} successfully`
	})

})

const deleteUsers = asyncHandler(async (req, res) => {
	const { id } = req.params

	if (!id) {
		return res.status(400).json({
			success: false,
			message: 'User Id is required'
		})
	}

	const task = await Task.findOne({ user: id }).lean().exec()

	if (task) {
		res.status(400).json({
			success: false,
			message: 'User has assigned tasks'
		})
	}

	const user = await User.findById(id).exec()

	if (!user) {
		res.status(404).json({
			success: false,
			message: 'User not found'
		})
	}
	const result = await user.deleteOne()
	console.log(result)

	const reply = `username : ${user.username} with Id ${user._id} is deleted`
	res.json({
		success: true,
		reply
	})
})

const getEmployees = asyncHandler(async (req, res) => {
	const { company } = req.body;
	const users = await User.find({ company, roles: "Employee" }).select('-password').lean()
	if (!users?.length) {
		return res.status(404).json({
			success: false,
			message: 'No user not found'
		})
	}
	res.json({
		success: true,
		users
	}
	)
})

const registerUser = asyncHandler(async (req, res) => {
	const { username, password, company, email } = req.body;
	console.log(username, password, company, email);

	if (!username) {
		return res.status(400).json({
			success: false,
			message: 'Username is required'
		})
	}
	if (!password) {
		return res.status(400).json({
			success: false,
			message: 'password is required'
		})
	}
	if (!email) {
		return res.status(400).json({
			success: false,
			message: 'email is required'
		})
	}
	if (!password) {
		return res.status(400).json({
			success: false,
			message: 'password is required'
		})
	}

	const duplicate = await User.findOne({ username }).lean().exec();
	if (duplicate) {
		return res.status(409).json({
			success: false,
			message: 'Duplicate username'
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const userObject = { username, password: hashedPassword, roles: 5000, company };

	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({
			success: false,
			message: `New user ${username} created`
		});
		console.log(user);
	} else {
		res.status(400).json({
			success: false,
			message: 'Invalid user data'
		});
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);

	if (!username) {
		return res.status(400).json({
			success: false,
			message: 'Username is required'
		});
	}

	if (!password) {
		return res.status(400).json({
			success: false,
			message: "Password is required"
		})
	}


	const user = await User.findOne({ username }).lean().exec();
	if (!user) {
		return res.status(404).json({
			success: false,
			message: 'User not found'
		});
	}
	console.log(user)
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		return res.status(401).json({
			success: false,
			message: 'Invalid username or password'
		});
	}

	const accessToken = generateAccessToken(res, {
		username: user.username,
		userid: user._id,
		company: user.company,
		roles: user.roles
	});

	generateRefreshToken(res, {
		username: user.username,
		isAdmin: user.roles === 5000 ? true : false,
		roles: user.roles
	});



	res.json({
		success: true,
		message: 'Logged in successfully',
		token: accessToken,
		user: {
			username: user.username,
			userid: user._id,
			roles: user.roles,
			company: user.company,
			status: user.active
		}
	});
});


const createEmployeeByAdmin = asyncHandler(async (req, res) => {
	const { username, password, company } = req.body
	console.log(username, password, company)

	if (!username || !password || !company) {
		return res.json({
			success: false,
			message: "All Fields are required"
		})
	}

	const duplicate = await User.findOne({ username }).lean().exec()
	if (duplicate) {
		return res.status(409).json({
			success: false,
			message: 'Duplicate username'
		})
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	const userObject = { username, password: hashedPassword, roles: 1999, company }

	const user = await User.create(userObject)

	if (user) {
		res.status(201).json({
			success: true,
			message: `New user ${username} created`
		})
	} else {
		res.status(400).json({
			success: false,
			message: 'Invalid user data'
		})

	}
})

const logoutUser = asyncHandler(async (req, res) => {
	res?.clearCookie('jwt')
	res?.clearCookie('refreshToken')
	res.json({
		success: true,
		message: 'Logged out successfully'
	})
})


const refreshToken = asyncHandler(async (req, res) => {
	const token = req.cookies.refreshToken
	if (!token) {
		logoutUser(req, res);
		return res.status(401).json({
			success: false,
			message: 'No token found'
		})
	} else {
		console.log(token)
		jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
			if (err) {
				return res.status(403).json({
					success: false,
					message: err
				})
			}
			const accessToken = generateAccessToken(res, {
				username: user.username,
				userid: user._id,
				roles: user.roles,
				company: user.company
			})
			res.json({
				success: true,
				message: 'Token refreshed',
				token: accessToken
			})
		})
	}



}
)




export default {
	getAllUsers,
	updateUsers,
	deleteUsers,
	getEmployees,
	registerUser,
	loginUser,
	createEmployeeByAdmin,
	logoutUser,
	refreshToken
}