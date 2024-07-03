import { logEvents } from "./logger.js";
import dotenv from 'dotenv'
dotenv.config()
const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name} \t ${err.message} \t ${req.method} \t ${req.url} \t ${req.headers.origin} `, 'errLog.log')
	console.log(err.stack)
	const status = res.statusCode ? res.statusCode : 500

	res.status(status)
	console.log(err.message)

	res.json({
		success: false,
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? 'Error' : err.stack
	})
}

export { errorHandler }