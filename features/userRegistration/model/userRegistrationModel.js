 let mongoose = require('mongoose')
 
 let userRegistrationSchema = new mongoose.Schema({
   userName:{
     type:String,
         required:true
   },
   email:{
     type:String,
     required: true,
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    
   },
   password:{
     type:String,
    required:true
   }
 })
 
 module.exports = mongoose.model("Users",userRegistrationSchema)