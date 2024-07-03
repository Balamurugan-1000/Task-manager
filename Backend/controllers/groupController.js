import Group from "../models/Group.js"
import User from "../models/User.js"
import Task from "../models/Task.js"
import asyncHandler from 'express-async-handler'
import expressAsyncHandler from "express-async-handler"
const getAllGroups = expressAsyncHandler(async (req, res) => {
	try {

		const groupsResult = await Group.find().populate('members').populate('createdBy')

		const groups = groupsResult.map(group => {
			return {
				_id: group._id,
				name: group.name,
				description: group.description,
				members: group.members.map(member => {
					return {
						username: member.username,
						roles: member.roles
					}
				}),
				createdBy: { NAME: group.createdBy.username, ROLE: group.createdBy.roles },
				createdAt: group.createdAt
			}
		}
		)

		res.status(200).json(groups)
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message
		})
	}
})



const createGroup = asyncHandler(async (req, res) => {
	const { name, description, members, createdBy } = req.body
	const group = await Group.create({ name, description, members, createdBy })
	const user = await User.findById(createdBy)
	await group.save()
	res.status(201).json({
		_id: group._id,
		name: group.name,
		description: group.description,
		members: group.members,
		createdBy: user.username,
		createdAt: group.createdAt,
		success: true,
	})

})


const getGroupById = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id).populate('members').populate('createdBy')
	if (group) {
		res.status(200).json(group)
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}
}
)


const updateGroup = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id)
	if (group) {


		group.name = req.body.name || group.name
		group.description = req.body.description || group.description
		group.members = req.body.members || group.members
		const updatedGroup = await group.save()
		res.status(200).json(updatedGroup)
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}
}
)



const deleteGroup = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id)
	if (group) {
		await Group.findByIdAndDelete(req.params.id)
		res.status(200).json({
			success: true,
			message: 'Group removed'
		})
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}
}
)


const addMemberToGroup = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id)
	if (group) {

		const user = await User.findById(req.body.userId)

		//Check if user exists in the group already

		const userExists = group.members.find(member => member._id.toString() === user._id.toString())

		if (userExists) {
			res.status(400)
			throw new Error('User already exists in the group')
		}
		if (user) {

			group.members.push(user)
			await group.save()
			user.groups.push(group)
			await user.save()

		}
		else {
			res.status(404)
			throw new Error('User not found')
		}
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}



	return res.status(200).json(group)
}
)


const removeMemberFromGroup = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id)
	if (group) {

		const user
			= await User.findById(req.params.userId)
		if (user) {
			group.members.pull(user)
			await group.save()
			user.groups.pull(group)
			await user.save()
			res.status(200).json(group)
		}
		else {
			res.status(404)
			throw new Error('User not found')
		}
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}
}
)


const getGroupTasks = asyncHandler(async (req, res) => {
	const group
		= await Group.findById(req.params.id)
	if (group) {
		const tasks
			= await Task.find({
				group: group._id
			}).populate('assignedTo').populate('createdBy')
		res.status(200).json(tasks)
	}
	else {
		res.status(404)
		throw new Error('Group not found')
	}
}
)

export default {

	getAllGroups,
	createGroup,
	getGroupById,
	updateGroup,
	deleteGroup,
	addMemberToGroup,
	removeMemberFromGroup,
	getGroupTasks

}