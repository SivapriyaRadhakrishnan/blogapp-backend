const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcryptjs")//encryption
 
mongoose.connect("mongodb+srv://siva:6282615940@cluster0.lqoh3rx.mongodb.net/blogappdb?retryWrites=true&w=majority&appName=Cluster0")
const {blogmodel}=require("./model/blog")
const app=express()
app.use(cors())
app.use(express.json())
//to make it hashed password and to make generatHashedPassword  asynchronous 
const generatHashedPassword=async(password)=>{
   const salt=await bcrypt.genSalt(10)
   return bcrypt.hash(password,salt)
}
 
app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedPassword=await generatHashedPassword(input.password)//hashed password
    console.log(hashedPassword)
    input.password=hashedPassword//pass password into input
    let  blog=new blogmodel(input)
    blog.save()
    res.json({"status":"success"})
})
app.listen(8089,()=>{
    console.log("server started")
})