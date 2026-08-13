const express = require('express')
const controller = require('./../controllers/authController');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/logout').post(controller.logout) 
router.route('/send-verify-otp').post(userAuth,controller.sendVerifyOtp)
router.route('/verify-account').post(userAuth,controller.verifyEmail)
router.route('/is-auth').post(userAuth,controller.isAuthenticated)
router.route('/send-reset-otp').post(controller.sendResetPasswordOtp)
router.route('/reset-password').post(controller.resetPassword)

module.exports = router   