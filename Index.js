const express = require("express")
const app = express()
const Db = require("./DB/Db.js")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT;
app.use(express.json())
app.use(cors({
  origin:'http://localhost:5173',
  methods : ["GET","POST","PATCH","PUT"]
}))
app.get("/",(req,res)=>{
  res.send("Server connected")
})
app.use("/Api",require("./Routes/Api/Register.js"))
app.listen(PORT,()=>{
  console.log(`Your server is running on ${PORT}`);
})