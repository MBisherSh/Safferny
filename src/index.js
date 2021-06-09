const express = require('express');
const config = require('config');
const http = require('http');
const {
    database: {sequelize},
    Exception,
} = require('../utils');

sequelize
    .authenticate()
    .then(async () => {
        const app = express();
        await require('./app')(app);

        const httpServer = http.createServer(app);
        const port = process.env.PORT || config.get('port');

        httpServer.listen(port, () => {
            console.info(`Server is listening on port ${port}`);
        });
    })
    .catch(Exception.defaultHandler);
