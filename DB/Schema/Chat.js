const mongoose = require("mongoose")
const Data = new mongoose.Schema({
  Message:String,
  PostedBy:{
   type: String,
  
}},
  {
  timestamps:true
  })
module.exports = mongoose.model("Chats",Data)