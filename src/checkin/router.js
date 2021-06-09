const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../utils');
const controller = require('./controllers/checkin');
const authController = require('../auth/controllers/auth');
/*************************
 * @Router /checkin         *
 *************************/
router.use(catchAsync(authController.authenticateToken));
router.get('/', catchAsync(controller.getMyCheckins));
router.post('/', catchAsync(controller.book));

module.exports = router;
