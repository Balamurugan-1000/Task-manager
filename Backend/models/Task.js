import mongoose from "mongoose";
import sequence from 'mongoose-sequence'
// const { default: sequence } = await import('mongoose-sequence');
const AutoIncrement = sequence(mongoose);
const taskSchema = new mongoose.Schema({
	AssignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'

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
		type: String,
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


taskSchema.plugin(AutoIncrement, {
	inc_field: 'ticket',
	id: 'ticketNums',
	start_set: 500
})
export default mongoose.model('Task', taskSchema)