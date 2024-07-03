import { id } from "date-fns/locale";
import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},
	profileImage: {
		type: String,
		required: true
	}

})