const express = require('express');
const path = require('path');
const argv = require('args-parser')(process.argv);
const { exit } = require('process');
const {
	database: { sequelize, initModels, associateModels, syncModels },
	Exception,
	catchAsync,
} = require('../utils');

const init = async (app) => {
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json({ limit: '50mb' }));
	app.use(express.text({ limit: '50mb' }));

	app.use('/auth', require('./auth/router'));
	app.use('/trips', require('./trip/router'));
	app.use('/checkin', require('./checkin/router'));

	//const accessTokenVerifier = require('./auth/controllers/auth').accessTokenVerifier(true);

	//app.use(catchAsync(accessTokenVerifier));

	//app.use(require('./router'));

	app.use(Exception.requestDefaultHandler);

	initModels();
	associateModels();
	if (argv.sync) {
		let syncOptions = { alter: true };
		if (argv.force) {
			syncOptions = { force: true };
			await sequelize.getQueryInterface().dropAllTables();
		}
		await syncModels(syncOptions);
		exit(0);
	}
};

module.exports = init;
