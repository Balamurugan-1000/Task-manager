import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	roles: {
		type: Number,
		default: 1999
	},
	active: {
		type: Boolean,
		default: true
	},
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	email: {
		type: String
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}]


})


export default mongoose.model('User', userSchema)