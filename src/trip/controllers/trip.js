const { statusCodes, Exception } = require('../../../utils');
const TripService = require('../services/trip');

module.exports = {
	getAll: async (req, res) => {
		const query = req.query;
		const data = await TripService.getAvailableTrips(query);
		res.status(statusCodes.OK).json(data);
	},
	getTripDetails: async (req, res) => {
		const tripId = req.params.id;
		const data = await TripService.getTripDetails(tripId);
		res.status(statusCodes.OK).json(data);
	},
};
