const mongoose = require("mongoose")
const Data = new mongoose.Schema({
  name:String,
  password:String,
  token:String}
  ,{
  timestamps:true
  })
module.exports = mongoose.model("Datas",Data)