const express = require('express');
const router = express.Router();
const { catchAsync } = require('../../utils');
const controller = require('./controllers/auth');
const validator = require('./validators/auth');
/*************************
 * @Router /auth         *
 *************************/

router.post('/signup', catchAsync(controller.signUp));
router.post('/login',  catchAsync(controller.login));
module.exports = router;
