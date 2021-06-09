const { DataTypes } = require('sequelize');

const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class Checkin extends BaseModel {
	static associate() {
		Checkin.belongsTo(sequelize.model('PlaneSeat'), { foreignKey: 'planeSeatId' });
		Checkin.belongsTo(sequelize.model('Trip'), { foreignKey: 'tripId' });
		Checkin.belongsTo(sequelize.model('User'), { foreignKey: 'userId' });
	}

	static initialize() {
		Checkin.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				ticketType: {
					type: DataTypes.ENUM(['round-trip', 'one-way']),
					allowNull: false,
				},
				weight: {
					type: DataTypes.DOUBLE,
					allowNull: false,
				},
			},
			{
				sequelize,
				updatedAt: false,
			}
		);
	}
}

Checkin.register();

module.exports = Checkin;
