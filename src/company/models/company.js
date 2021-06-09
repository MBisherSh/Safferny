const { DataTypes } = require('sequelize');
const User = require('../../user/models/user')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class Company extends BaseModel {
	static associate() {
		Company.belongsTo(sequelize.model('User'),{foreignKey:'founderId'})
	}

	static initialize() {
		Company.init(
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
				address: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				website: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				date: {
					type: DataTypes.DATEONLY,
					allowNull: false,
				},
			},
			{
				sequelize,
			}
		);
	}
}

Company.register();

module.exports = Company;
