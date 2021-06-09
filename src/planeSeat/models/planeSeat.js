const { DataTypes } = require('sequelize');
const Checkin = require('../../checkin/models/checkin')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class PlaneSeat extends BaseModel {
	static associate() {
		PlaneSeat.belongsTo(sequelize.model('Plane'), { foreignKey: 'planeId' });
		PlaneSeat.hasMany(sequelize.model('Checkin'), { foreignKey: 'planeSeatId' });
	}

	static initialize() {
		PlaneSeat.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				type: {
					type: DataTypes.ENUM(['economy', 'premium economy', 'business', 'first class']),
					allowNull: false,
				},
				count: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				price: {
					type: DataTypes.DOUBLE,
					allowNull: false,
				},
			},
			{
				sequelize,
				updatedAt: false,
				createdAt: false,
			}
		);
	}
}

PlaneSeat.register();

module.exports = PlaneSeat;
