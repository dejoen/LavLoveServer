let express = require('express')
let app = express()
let dbInitialization =require('./dbConfig/dbConfig.js')
let errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware.js')
let dotenv = require('dotenv').config()
let bodyParser = require('body-parser')
let userRegistrationRouter = require('./features/userRegistration/route/userRegistrationRoute.js')
let cors = require('cors')

//app.use(bodyParser())
app.use(cors())
app.use(bodyParser.json({urlencoded:true}))
app.use("/api/v1/users",userRegistrationRouter)


app.use(errorHandlerMiddleware)
 dbInitialization().then((res,err)=>{
   console.log(err)
   app.listen(3020,()=>{
  console.log('server active on port 3020')
})
 }).catch(err=>{
   console.log('error occur')
 })
