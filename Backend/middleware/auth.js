import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization
	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const token = authHeader.split(' ')[1]

	jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
		if (err) {
			console.log(err)
			return res.status(401).send('Failed to authenticate token')
		};
		req.user = decoded;
		next();
	});
}


export const authorizeAdmin = (req, res, next) => {
	if (req.user.roles === 5000) {
		next()
	}
	else {
		return res.status(403).json({
			success: false,
			message: 'Forbidden'
		})
	}
}


