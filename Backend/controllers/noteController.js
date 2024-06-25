import User from '../models/User.js'
import Note from '../models/Note.js'
import asyncHandler from 'express-async-handler'


const getAllNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find()
	if (!notes?.length) {
		return res.status(404).json({ message: 'No notes found' })
	}
	res.json(notes)
})


const createNewNote = asyncHandler(async (req, res) => {
	const { user, title, text } = req.body
	if (!user || !title || !text) {
		res.status(409).json({ message: 'All fields are required' })
	}


	const duplicate = await Note.findOne({ title })
	if (duplicate) {
		return res.status(400).json({ message: 'Duplicate Note found' })
	}


	const userData = await User.findById(user).lean().exec()
	if (!userData) {
		return res.status(404).json({ message: "User not found" })
	}


	const noteObject = {
		user, title, text
	}

	const note = await Note.create(noteObject)
	if (note) {
		res.status(201).json({ message: `Note ${title} was created successfully` })
	} else {
		res.status(400).json({ message: 'invalid Note data' })
	}
})

const updateNote = asyncHandler(async (req, res) => {
	const { id, user, title, text, completed } = req.body

	if (!id || !user || !title || !text || typeof completed !== 'boolean') {
		return res.status(400).json({ message: 'All fields are required' })
	}

	// Confirm note exists to update
	const note = await Note.findById(id).exec()

	if (!note) {
		return res.status(400).json({ message: 'Note not found' })
	}
	const userData = User.findById(user)
	if (!userData) {
		return res.status(404).json({ message: "The given User not found" })
	}

	const duplicate = await Note.findOne({ title }).lean().exec()
	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: 'Duplicate note title' })
	}

	note.user = user
	note.title = title
	note.text = text
	note.completed = completed

	const updatedNote = await note.save()

	res.json(`'${updatedNote.title}' updated`)
})


const deleteNote = asyncHandler(async (req, res) => {
	const { id } = req.body

	if (!id) {
		return res.status(400).json({ message: 'Note ID required' })
	}


	const note = await Note.findById(id).exec()

	if (!note) {
		return res.status(400).json({ message: 'Note not found' })
	}

	const result = await note.deleteOne()

	const reply = `Note '${note.title}' with ID ${note._id} deleted`

	res.json(reply)
})


export default {
	createNewNote, updateNote, deleteNote, getAllNotes
}