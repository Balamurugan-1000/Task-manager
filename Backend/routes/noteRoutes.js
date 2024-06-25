import express from "express";
const router = express.Router()
import noteController from "../controllers/noteController.js";

router.route('/')
	.get(noteController.getAllNotes)
	.post(noteController.createNewNote)
	.patch(noteController.updateNote)
	.delete(noteController.deleteNote)


export default router