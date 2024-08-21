import Group from "../models/Group.js"
import User from "../models/User.js"
import Task from "../models/Task.js"
import asyncHandler from 'express-async-handler'
import expressAsyncHandler from "express-async-handler"


const getAllGroups = asyncHandler(async (req, res) => {
	const company = req.params.company

	const groups = await Group.find({ company }).lean().exec()
	if (!groups) {
		return res.status(404).json({
			success: false,
			message: 'Groups not found'
		})
	}




	for (let i = 0; i < groups.length; i++) {
		const group = groups[i]
		const members = await User.find({ _id: { $in: group.members } }).lean().exec()
		const tasks = await Task.find({ _id: { $in: group.tasks } }).lean().exec()

		groups[i] = {
			...group,
			members,
			tasks
		}
	}


	res.json({
		success: true,
		data: groups
	})



})

const createGroup = asyncHandler(async (req, res) => {
	const { company } = req.params
	const { name } = req.body

	if (!name) {
		return res.status(400).json({
			success: false,
			message: 'Name is required'
		})
	}
	if (!company) {
		return res.status(400).json({
			success: false,
			message: 'Company is required'
		})
	}

	//Check if group already exists
	const existingGroup = await Group.findOne({ name, company }).lean().exec()
	if (existingGroup) {
		return res.status(400).json({
			success: false,
			message: 'Group already exists'
		})
	}

	console.log(existingGroup)
	const group = await Group.create({ name, company })

	res.json({
		success: true,
		data: group
	})
})

const deleteGroup = asyncHandler(async (req, res) => {
	const groupId = req.params.id
	console.log(groupId)

	const group = await Group.findById(groupId)
	console.log(group)
	if (!group) {
		console.log('Group not found')
		return res.status(404).json({
			success: false,
			message: 'Group not found'
		})
	}

	await group.deleteOne()



	res.json({
		success: true,
		message: 'Group deleted'
	})
})

const addMemberToGroup = asyncHandler(async (req, res) => {
	const { id: groupId } = req.params
	const { userId } = req.body

	const group = await Group.findById(groupId).exec()
	const user = await User.findById(userId).exec()

	if (!group || !user) {
		return res.status(404).json({
			success: false,
			message: 'Group or User not found'
		})
	}
	group.members.push(user._id)
	user.groups.push(group._id)

	await user.save()
	await group.save()

	res.json({
		success: true,
		message: 'User added to group'
	})
})

const removeMemberFromGroup = asyncHandler(async (req, res) => {
	const { id: groupId } = req.params
	const { userId } = req.body


	console.log(groupId, userId)
	const group = await Group.findById
		(groupId).exec()
	const user = await User.findById(userId).exec()

	if (!group || !user) {
		return res.status(404).json({
			success: false,
			message: 'Group or User not found'
		})
	}

	group.members.pull(user._id)
	user.groups.pull(group._id)

	await user.save()

	await group.save()

	res.json({
		success: true,
		message: 'User removed from group'
	})


})
const getGroupByUser = asyncHandler(async (req, res) => {
	const userId = req.params.id
	const groups = await Group.find({ members: userId }).populate('members').populate('tasks')
		.lean().exec()
	if (!groups) {
		return res.status(404).json({
			success: false,
			message: 'Groups not found'
		})
	}

	res.json({
		success: true,
		data: groups
	})

})

export default { getAllGroups, createGroup, deleteGroup, addMemberToGroup, removeMemberFromGroup, getGroupByUser }