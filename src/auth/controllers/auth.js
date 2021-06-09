const { statusCodes, Exception } = require('../../../utils');
const AuthenticationService = require('../services/auth');

module.exports = {
	authenticateToken: async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		req.user = AuthenticationService.authenticateToken(authHeader);
		next();
	},

	signUp: async (req, res) => {
		const userData = req.body;
		const data = await AuthenticationService.signUp(userData);
		res.status(statusCodes.CREATED).json(data);
	},

	login: async (req, res) => {
		const userData = req.body;
		const data = await AuthenticationService.login(userData);
		res.status(statusCodes.OK).json(data);
	},
};
