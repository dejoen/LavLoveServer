
module.exports = (err,req,res,next)=>{
    res.status(400).json({
      title:'Error Message',
      error:err.message
    })
}