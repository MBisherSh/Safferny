const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../utils');
const controller = require('./controllers/trip');
/*************************
 * @Router /trip         *
 *************************/

router.get('/', catchAsync(controller.getAll));
router.get('/:id', catchAsync(controller.getTripDetails));

module.exports = router;
