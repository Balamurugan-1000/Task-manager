import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	AssignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'

	},
	AssignedGroup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'incompleted'
	},
	priority: {
		type: String,
		required: true
	},
	DueDate: {
		type: Date,
		required: true
	},
	Subtasks: [{
		type: String,
		required: false
	}],
	Group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}
},
	{
		timestamps: true
	}
)



export default mongoose.model('Task', taskSchema)