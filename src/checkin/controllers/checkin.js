const { statusCodes, Exception } = require('../../../utils');
const CheckinService = require('../services/checkin');
module.exports = {
	book: async (req, res) => {
		const userId = req.user.id;
		const details = req.body;
		const data = await new CheckinService({ userId, ...details }).book();
		res.status(statusCodes.CREATED).json(data);
	},
	getMyCheckins: async (req, res) => {
		const userId = req.user.id;
		const data = await CheckinService.getMyCheckins(userId);
		res.status(statusCodes.OK).json(data);
	},
};
