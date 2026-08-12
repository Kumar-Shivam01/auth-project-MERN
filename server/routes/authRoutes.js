const express = require('express')
const controller = require('./../controllers/authController');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/logout').post(controller.logout) 
router.route('/send-verify-otp').post(userAuth,controller.sendVerifyOtp)
router.route('/verify-account').post(userAuth,controller.verifyEmail)
module.exports = router   