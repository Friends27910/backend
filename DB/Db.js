require("dotenv").config("../.env")
const Mongo = process.env.DB ;
const Data = require("./Schema/Uschema.js")
const mongoose = require("mongoose")
 const server =  mongoose.connect(Mongo)
  .then(()=> console.log("Db connected"))
 .catch((err)=> console.log(err))
module.exports = server