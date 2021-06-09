const jwt = require('jsonwebtoken');
const { statusCodes, Exception } = require('../../../utils');
const config = require('config');
const { secret, expiresIn } = config.get('jwt');
const bcrypt = require('bcrypt');
const UserService = require('../../user/services/user');
class Authentication {
	static generateAccessToken(user) {
		return jwt.sign(user, secret, { expiresIn });
	}

	static authenticateToken(authHeader) {
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) throw new Exception(statusCodes.UNAUTHORIZED, 'Please sign in.');
		let userData;
		jwt.verify(token, secret, (err, user) => {
			if (err) throw new Exception(statusCodes.UNAUTHORIZED, 'Please sign in.');
			else userData = user;
		});
		return userData;
	}

	static async signUp(userData) {
		userData.passwordHash = await bcrypt.hash(userData.password, 12);
		userData.role = 'user';
		console.log(userData)
		const user = await new UserService(userData).createUser();
		const token = Authentication.generateAccessToken({ id: user.id, email: user.email });
		const {passwordHash, ...result} = user.dataValues;
		return { user: result, token };
	}

	static async login(userData) {
		const { email, password } = userData;
		const user = await UserService.findUserByEmail(email);
		console.log(password)
		console.log(user.passwordHash)
		if (!user) throw new Exception(statusCodes.ITEM_NOT_FOUND, 'no such user');
		else if (!(await bcrypt.compare(password, user.passwordHash)))
			throw new Exception(statusCodes.UNAUTHORIZED, 'wrong password');
		else {
			const token = Authentication.generateAccessToken({ id: user.id, email: user.email });
			const {passwordHash, ...result} = user.dataValues;
			return { user: result, token };
		}
	}
}

module.exports = Authentication;
