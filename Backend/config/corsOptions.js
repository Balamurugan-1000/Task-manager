import { allowedOrigins } from "./allowedOrigin.js";


const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by Cors'))
		}
	},
	Credentials: true,
	optionsSuccessStatus: 200
}

export { corsOptions }