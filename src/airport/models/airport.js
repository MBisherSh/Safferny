const { DataTypes } = require('sequelize');
const City = require('../../city/models/city')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class Airport extends BaseModel {
	static associate() {
		Airport.belongsTo(sequelize.model('City'),{foreignKey:'cityId'})
	}

	static initialize() {
		Airport.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				capacity: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},

			},
			{
				sequelize,
			}
		);
	}
}

Airport.register();

module.exports = Airport;
