const { DataTypes } = require('sequelize');
const Company = require('../../company/models/company')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class User extends BaseModel {
	static associate() {
		User.hasMany(sequelize.model('Company'))
	}

	static initialize() {
		User.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				passwordHash: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				name: {
					type: new DataTypes.VIRTUAL(DataTypes.STRING, ['firstName', 'lastName']),
					get: function () {
						return this.get('firstName') + ' ' + this.get('lastName');
					},
				},
				role: {
					type: DataTypes.ENUM('user', 'admin'),
					allowNull: false,
					defaultValue: 'user',
				},
				gender: {
					type: DataTypes.ENUM('male', 'female'),
					allowNull: false,
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				dateOfBirth: {
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

User.register();

module.exports = User;
