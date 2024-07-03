import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const generateAccessToken = (res, user) => {
	const token = jwt.sign(
		user,
		process.env.ACCESS_TOKEN,
		{ expiresIn: '15m' }

	);

	return token;
}

const generateRefreshToken = (res, user) => {
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

	res.cookie('refreshToken', refreshToken, { httpOnly: true });

	return {
		success: true,
		message: 'Token generated',
		refreshToken
	};

}

export { generateAccessToken, generateRefreshToken };