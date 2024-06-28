let Users = require('../../../features/userRegistration/model/userRegistrationModel.js')
let jwt = require('jsonwebtoken')

let bcrypt = require('bcryptjs')
let loginUser = async (req,res)=>{
  
  try{

  const {email, password} = req.body

   
  let user = await Users.findOne({
    email
  })
   
  if(!user){
    res.status(400).json({
      title:"Login Message",
      message:`user with email = ${email} is not registered try registering`
    })
    
    return
  }
  
  const validatePassword =await  bcrypt.compare(password,user.password)
   if(validatePassword){
    const token=jwt.sign(user._doc,process.env.SECRET_KEY,{expiresIn:"30d"})
    res.status(200).json({
      title:"Login Message",
      user:{token,...user._doc},
      message:"you have successfully log in"
    })
   }
  
  }catch(err){
    console.log(err.message)
      res.status(500).json({
        title:"Login Message ",
        message:err.message
      })
  }
}

module.exports = {loginUser}