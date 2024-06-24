let Users = require('../model/userRegistrationModel.js')
let passwordHash = require('bcryptjs')
let jwt = require('jsonwebtoken')
let  userOtp = require('../../Notification/userRegistrationOtpNotification.js')
let generateOtp = require('../../../utils/generateOTP.js')

let nodeCache = require ('node-cache')
let memory = new nodeCache({stdTTL:0, checkperiod:1})


let registerUser = async(req,res,next)=>{
await Users.deleteMany()
  const {username,email, password} = req.body
  if(!username || !email || !password){
    res.status(400).json({
      title:'Registration Message',
      message:'please provide username, email and password fields to complete this process.'
    })
    
    return
  }
  let  otp = req.params.otp
 
   const isEmailAlreadyExisting = await Users.findOne({email})
  if(isEmailAlreadyExisting){
        res.status(400).json({
      title:'Registration Message',
      message:`user with email= ${email} already exist try using another email`
    })
    
    return
  }
  
  
  if(!otp){
   let  otp = await generateOtp(999999)
   let isUserAlreadySentOtp = memory.get(email)
   if(isUserAlreadySentOtp){
     res.status(200).json({
       title:"Registration Message",
       message:`Otp already sent to email=${email}  check your email or resend after 2mins`
     })
     return
   }
  userOtp.sendUserOTP({
    message:"hello boss",
    receiver:"benagu477@gmail.com",
    otp
  }).then(re=>{
    console.log(re)
     memory.set(email,otp,60*2)
     
    res.status(200).json({
           title:"Registration Message",
       message:`Otp successfully sent to email=${email}  check your email and continue sign up process`
  })
  }).catch(err=>{
    console.log(err.message)
    next(err.message)
  })
/*  
  
  */
  
  }else{
    
   let storedOtp = memory.get(email)
   
    if(!storedOtp){
      res.status(400).json({
        title:"Registration Message",
      message:"otp expired request for new otp"
    })
    return 
    }
    
    if(Number(otp)===Number(storedOtp)){
      let salt = await passwordHash.genSalt(10)
      passwordHash.hash(password,salt).then(
    async (hashedPassword)=>{
       try{
       const saveUser = await Users({
         userName:username,
         email,
         password:hashedPassword
       })
     await  saveUser.save()
     
     if(saveUser){
       console.log(saveUser)
    const token=jwt.sign(saveUser._doc,process.env.SECRET_KEY,{expiresIn:"30d"})
     
      res.status(200).json({
        title:'Registration Message',
        message:"successfully signed up to lav love app welcome onboard ",
       user:{...saveUser._doc,token}
      })
    
     }
     
       }catch(err){
             res.status(400).json({
      title:'Registration Message',
      error:`${err.message}`
    })
    
   
  }
       
       
       
       
     }
     ).catch(err=>{
           res.status(500).json({
      title:'Server Error',
      message:`${err.message}`
    })
    
    
  })
     
       }else{
      res.status(400).json({
        title:"Registration Message",
      message:"not a valid otp code verify from email and try again "
    })
      
    }

    
  }
}

module.exports= {
  registerUser
}