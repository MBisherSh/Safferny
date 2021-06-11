const { Exception, statusCodes } = require('../../../utils');
const User = require('../models/user');
const { Op } = require('sequelize');
const _ = require('lodash');

class UserService {
	constructor(data) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.email = data.email;
		this.passwordHash = data.passwordHash;
		this.phoneNumber = data.phoneNumber;
		this.role = data.role;
		this.dateOfBirth = data.dateOfBirth;
		this.gender = data.gender;
	}
	async createUser() {
		if (await UserService.isDuplicated(this.email))
			throw new Exception(statusCodes.DUPLICATED_ENTRY, 'A user with this email is already registered');
		return await this.save();
	}
	static async isDuplicated(email) {
		return (
			(await User.count({
				where: { [Op.and]: [{ email }] },
			})) > 0
		);
	}

	static async findUserByEmail(email, attributes) {
		return await User.findOne({ where: { email }, attributes });
	}

	async save() {
		return User.create(this);
	}

	async checkInfo(userData) {
		if (this.email && userData.email !== this.email) {
			const duplicated = await UserService.isDuplicated(this.email);
			if (duplicated)
				throw new Exception(statusCodes.DUPLICATED_ENTRY, 'A user with this email is already registered');
		}
	}

	async updateUser(userData) {
		await this.checkInfo(userData);
		await User.update(
			_.pick(this, [
				'firstName',
				'lastName',
				'occupation',
				'city',
				'country',
				'website',
				'mobileNumber',
				'email',
				'prayerTimeMethod',
				'madhab',
				'lng',
				'lat',
				'img',
				'location',
			]),
			{ where: { id: userData.id } }
		);
      return await UserService.findById(userData.id);
	}

	async updateUserById(id) {
		const user = await UserService.findById(id);
		if (!user) throw new Exception(statusCodes.ITEM_NOT_FOUND, 'no such user');
		await this.checkInfo(user);
		return await user.update(this);
	}

	static async findById(id, attributes) {
		return await User.findByPk(id, { attributes });
	}

	static async getInfo(userId) {
		const user = await UserService.findById(userId);
		if (!user) throw new Exception(statusCodes.ITEM_NOT_FOUND, 'no such user');
		return _.omit(user.toJSON(), ['verificationCode']);
	}

	static async deleteUser(userId) {
		const user = await UserService.findById(userId);
		if (user) return await user.destroy();
		else throw new Exception(statusCodes.BAD_REQUEST, 'no such user.');
	}
}

module.exports = UserService;
