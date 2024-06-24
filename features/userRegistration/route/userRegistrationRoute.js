let route = require('express').Router()
let userRegistrationController = require('../controller/userRegistrationController.js')

route.post("/signUp",userRegistrationController.registerUser)

route.post("/signUp/:otp",userRegistrationController.registerUser)
module.exports = route