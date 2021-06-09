const { statusCodes, Exception } = require('../../../utils');
const TripService = require('../services/trip');

module.exports = {
	getAll: async (req, res) => {
		const query = req.query;
		const data = await TripService.getAvailableTrips(query);
		res.status(statusCodes.OK).json(data);
	},
};
