const express = require('express')
const controller = require('./../controllers/authController');
const router = express.Router()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/logout').post(controller.logout) 

module.exports = router