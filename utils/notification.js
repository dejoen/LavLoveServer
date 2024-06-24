let  nodeMailer = require('nodemailer')

//notify
module.exports = async (data)=>{
  console.log("called to send otp")
  let transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
      user:"lavloveapp@gmail.com",
      pass:"sxnx zwzp rqdb eqvu"
    }
  })
  
  let mailOptions = {
    from:"lavloveapp@gmail.com",
    to:data.receiver,
    subject:"Message From LavLove App",
    text:`Welcome to LavLove App your otp is ${data.otp} `
  }
  
  return transporter.sendMail(mailOptions)
  
}