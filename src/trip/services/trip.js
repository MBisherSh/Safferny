const {
	Exception,
	statusCodes,
	database: { sequelize },
} = require('../../../utils');
const { Op } = require('sequelize');
const Trip = require('../models/trip');
const _ = require('lodash');

class TripService {
	static async getAvailableTrips(where) {
		return await Trip.findAll({
			where,
			include: [
				{
					model: sequelize.model('Plane'),
					attributes: ['name'],
					include: [
						{
							model: sequelize.model('Company'),
							attributes: ['name'],
						},
					],
				},

				{
					model: sequelize.model('Airport'),
					as: 'landingAirport',
					attributes: ['name'],
					foreignKey: 'landingId',
					include: [
						{
							model: sequelize.model('City'),
							attributes: ['name'],
						},
					],
				},
				{
					model: sequelize.model('Airport'),
					as: 'takingOffAirport',
					attributes: ['name'],
					foreignKey: 'takingOffId',
					include: [
						{
							model: sequelize.model('City'),
							attributes: ['name'],
						},
					],
				},
			],
		});
	}
}

module.exports = TripService;
