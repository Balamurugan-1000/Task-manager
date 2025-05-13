import mongoose from "mongoose";

const groupTaskSchema = new mongoose.Schema({
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	task: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});


export default mongoose.model('GroupTask', groupTaskSchema)