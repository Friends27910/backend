 const express = require("express");
 const router = express.Router()
 const Data = require("../../DB/Schema/Uschema.js")
 const messageDB = require("../../DB/Schema/Chat.js")
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")
 router.post("/Register",async(req,res)=>{
 try {
   console.log(req.body.name);
   const leCheckName = JSON.stringify(req.body.name)
   const leCheckPassword = JSON.stringify(req.body.password)
   console.log(leCheckName);
   if(leCheckName.length<5){
     res.status(400).json({error:"Name must have 5 letters"})
   }
   if(leCheckPassword.length<5){
     res.status(400).json({error:"Password must have 5 letters"})
   }
   else{
  try {
    let salt = 10
     var {name,password} = req.body 
     console.log(req.body.name)
     var check = await Data.findOne({name:req.body.name})
     console.log(check,"This is check")
     if(check){
   res.status(400).json({error:"user already exists.....!"})
     }
     
     else{
   password = await bcrypt.hash(password,salt)
   const save = await Data.insertMany([{name,password}])
    const id = await save[0]
    const sign = await jwt.sign({id:id},process.env.JWT_PASS,{
      expiresIn:Date.now() + 2592000000
      })
      const filter = await{name:req.body.name}
      const update = await Data.findOneAndUpdate(filter,{token:sign})
      const user = await Data.findOne({name:req.body.name})
       res.json(user)
     }
   } catch (error) {
     console.log(error);
     res.status(400).json(error)
   
 }}} catch(error) {
   console.log(e);
 }  })

 router.post("/login",async(req,res)=>{
   
  
  var {name,password} = req.body
  const find = await Data.findOne({name:req.body.name})
 if(find){
    const compare = await bcrypt.compare(req.body.password,find.password)
    if(compare == true){
      res.json(find)
    }
    else{
      res.status(400).json({error:"WRONG PASSWORD......!"})
    }
 } 
 else{
   res.status(400).json({error:"Account not exists....!"})
 }
 })
 router.post("/chat",async(req,res)=>{
   console.log(req.body);
   const {Message,PostedBy} = req.body
   const status = await messageDB.insertMany([{Message,PostedBy}])
   res.status(200).send({Message,PostedBy})
 })
router.get("/searchChat",async(req,res)=>{
   
   const findid = await messageDB.find()
   
   res.send(findid)

})
 module.exports = router