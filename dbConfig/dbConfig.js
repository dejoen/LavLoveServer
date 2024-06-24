let mongoose = require('mongoose')

let  initDb = async ()=>{
  
  return  mongoose.connect(process.env.LOCAL_DB_URL)
}

module.exports= initDb