const { DataTypes } = require('sequelize');

const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class Factory extends BaseModel {
	static associate() {
	}

	static initialize() {
		Factory.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				address: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				supportPhone: {
					type: DataTypes.STRING,
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

Factory.register();

module.exports = Factory;
