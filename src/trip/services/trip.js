const {
	Exception,
	statusCodes,
	database: { sequelize },
} = require('../../../utils');
const { Op } = require('sequelize');
const Trip = require('../models/trip');
const Checkin = require('../../checkin/models/checkin');
const PlaneSeats = require('../../planeSeat/models/planeSeat');
const Plane = require('../../plane/models/plane');
const _ = require('lodash');

class TripService {
	static async getAvailableTrips(filter) {
		let toWhere, fromWhere;
		if (filter.to) {
			toWhere = { name: { [Op.like]: filter.to + '%' } };
		}
		if (filter.from) {
			fromWhere = { name: { [Op.like]: filter.from + '%' } };
		}

		return await Trip.findAll({
			include: [
				{
					model: sequelize.model('Plane'),
					required: true,
					attributes: ['name', 'id'],
					include: [
						{
							model: sequelize.model('Company'),
							required: true,
							attributes: ['name'],
						},
					],
				},

				{
					model: sequelize.model('Airport'),
					required: true,
					as: 'landingAirport',
					attributes: ['name'],
					foreignKey: 'landingId',
					include: [
						{
							model: sequelize.model('City'),
							required: true,
							attributes: ['name'],
							where: toWhere,
						},
					],
				},
				{
					model: sequelize.model('Airport'),
					required: true,
					as: 'takingOffAirport',
					attributes: ['name'],
					foreignKey: 'takingOffId',
					include: [
						{
							model: sequelize.model('City'),
							required: true,
							attributes: ['name'],
							where: fromWhere,
						},
					],
				},
			],
		});
	}

	static async getTripById(id) {
		return await Trip.findByPk(id, {
			include: [
				{
					model: sequelize.model('Plane'),
					attributes: ['name', 'id'],
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

	static async getAvailablePlaneSeats(tripId, planeId) {
		let allSeats,
			takenSeats,
			availableSeats = [];
		allSeats = await PlaneSeats.findAll({ where: { planeId } });
		takenSeats = await Checkin.findAll({
			where: { tripId },
			attributes: ['planeSeatId', [sequelize.fn('count', sequelize.col('id')), 'takenSum']],
			group: ['planeSeatId'],
		});
		for (const seat of allSeats) {
			let takenCount = 0,
				availableCount = seat.count;
			for (const takenSeat of takenSeats) {
				if (seat.id === takenSeat.planeSeatId) {
					availableCount -= takenSeat.dataValues.takenSum;
					break;
				}
			}
			availableSeats.push({ seat, availableCount });
		}
		return availableSeats;
	}

	static async getTripDetails(id) {
		const trip = await TripService.getTripById(id);
		const planeSeats = await TripService.getAvailablePlaneSeats(trip.id, trip.planeId);
		return { trip, planeSeats };
	}
}

module.exports = TripService;
