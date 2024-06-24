let mongoose = require('mongoose')

let  initDb = async ()=>{
  
  return  mongoose.connect(process.env.DB_URL)
}

module.exports= initDb