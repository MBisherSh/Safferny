const {
	statusCodes,
	Exception,
	database: { sequelize },
} = require('../../../utils');
const Checkin = require('../models/checkin');

class CheckinService {
	constructor(data) {
		this.userId = data.userId;
		this.ticketType = data.ticketType;
		this.weight = data.weight;
		this.planeSeatId = data.planeSeatId;
		this.tripId = data.tripId;
	}
	async book() {
		return await Checkin.create(this);
	}
	static async getMyCheckins(userId) {
		return await Checkin.findAll({
			include: [
				{
					model: sequelize.model('PlaneSeat'),
					attributes: ['type', 'price'],
					include: [
						{
							model: sequelize.model('Plane'),
							attributes: ['name'],
						},
					],
				},
				{
					model: sequelize.model('Trip'),
					attributes: ['date', 'backDate'],
					include: [
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
				},
			],
			where: { userId },
			order: [['createdAt', 'desc']],
		});
	}
}

module.exports = CheckinService;
