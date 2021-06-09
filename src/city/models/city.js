const { DataTypes } = require('sequelize');
const Airport = require('../../airport/models/airport')

const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class City extends BaseModel {
	static associate() {
		City.hasMany(sequelize.model('Airport'),{foreignKey: 'cityId'})
	}

	static initialize() {
		City.init(
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

			},
			{
				sequelize,
			}
		);
	}
}

City.register();

module.exports = City;
