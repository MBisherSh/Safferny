const { DataTypes } = require('sequelize');
const Airport = require('../../airport/models/airport')
const Plane = require('../../plane/models/plane')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');
class Trip extends BaseModel {
	static associate() {
		Trip.belongsTo(sequelize.model('Airport'), { foreignKey: 'takingOffId', as:'takingOffAirport' });
		Trip.belongsTo(sequelize.model('Airport'), { foreignKey: 'landingId', as:'landingAirport' });
		Trip.belongsTo(sequelize.model('Plane'), { foreignKey: 'planeId' });
	}

	static initialize() {
		Trip.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				date: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				duration: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				backDate: {
					type: DataTypes.DATE,
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

Trip.register();

module.exports = Trip;
