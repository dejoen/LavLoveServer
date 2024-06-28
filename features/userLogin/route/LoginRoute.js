let route = require('express').Router()
let loginController = require('../controller/LoginController.js')

route.post('/loginUser',loginController.loginUser)

module.exports = route