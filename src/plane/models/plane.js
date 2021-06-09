const { DataTypes } = require('sequelize');
const Factory = require('../../factory/models/factory')
const PlaneSeat = require('../../planeSeat/models/planeSeat')
const {
	database: { sequelize, BaseModel },
} = require('../../../utils');

class Plane extends BaseModel {
	static associate() {
		Plane.belongsTo(sequelize.model('Factory'),{foreignKey:'factoryId'})
		Plane.belongsTo(sequelize.model('Company'),{foreignKey:'companyId'})
		Plane.hasMany(sequelize.model('PlaneSeat'),{foreignKey:'planeId'})
	}

	static initialize() {
		Plane.init(
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
				pets: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
				},
				kitchen: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
				},

			},
			{
				sequelize,
			}
		);
	}
}

Plane.register();

module.exports = Plane;
