const { userAuth } = require('../middleware/userAuth');
const userController = require('./../controllers/userController')
const express = require('express')


const userRouter = express.Router();
userRouter.route('/user-data').get(userAuth,userController.getUserData)

module.exports = userRouter
   