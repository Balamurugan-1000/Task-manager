import express from "express";
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()



import router from "./routes/root.js";
import { logger, logEvents } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import connectDb from "./config/db.js";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import groupRoutes from './routes/groupRoutes.js'
import { authenticate } from "./middleware/auth.js";
import authRoutes from './routes/authRoute.js'


const PORT = process.env.PORT || 3500

connectDb()


const __dirname = import.meta.dirname
const app = express()
app.use(cors(corsOptions))

app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', router)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/tasks', authenticate, taskRoutes)
app.use('/groups', groupRoutes)
app.all('*', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({
			success: false,
			message: '404 not found'
		})
	} else {
		res.type('txt').send('404 not found')
	}
})
app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('mongoDb connected')
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
})

mongoose.connection.once('error', err => {
	console.log(err)
	logEvents(`${err.no} \t ${err.code} \t ${err.syscall} \t ${err.hostname} `, 'mongoErrorLog.log')
})