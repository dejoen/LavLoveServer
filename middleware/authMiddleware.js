let jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
  try{
    let authHeader = req.headers.authorization || req.headers.Authorization 
    
    if(authHeader && authHeader.startsWith('Bearer')){
      let token = authHeader.split("")[1]
       jwt.verify(token,"",(err,decoded)=>{
          if(err){
            res.status(500).json({
              title:"Login Message ",
              message:"error occured",
              error:err.message
            })
            return
          }
          req.user= decoded
          next()
       })
       return
    }
    
    res.status(400).json({
      title:"Login message",
      message:"problem with authorization header check and try again"
    })
  } catch(err){
    res.status(500).json({
      title:"Login Message",
      message:"internal server error",
      error:err.message
      
    })
  }
  
    
}