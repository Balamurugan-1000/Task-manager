import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	active: {
		type: Boolean,
		default: true
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task'
	}],
	company: {
		type: String,
		required: true
	}

});

export default mongoose.model('Group', groupSchema)
