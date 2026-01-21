const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const JWT_SECRET = "key123key";

async function main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/TaskOn");
    }catch(err){
        console.log(err.message);
    }
}

main();

//mw
function auth(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_SECRET);
    if(token){
        req.token = decoded.data;
        next();
    }else{
        res.status(403).send({
            message:unauthorized
        })
    }
}

app.post("/signup",async (req,res)=>{//async - due to req to db
    const {username,password} = req.body;
    //to db
    res.send({
        message : "signed up!"
    })
    alert("you are signed up!");
})

app.post("/signin",async (req,res)=>{
    const {username,password} = req.body;
    //search in db
    //if yes-jwt token otherwise error
    if(user){
        const token = jwt.sign({
            username : username
        },JWT_SECRET);
        res.send()
    }else{
        res.status(403).send({
            message : "wrong credentials!"
        })
    }
})
//tasks-authenticated endpoints
app.get("/",auth,(req,res)=>{

})
app.post("/task/add",auth,(req,res)=>{
    
})
app.patch("/task/edit",auth,(req,res)=>{
    
})
app.delete("/task/delete",auth,(req,res)=>{
    
})

app.listen(8080,()=>{
    console.log(`listening to port : 8080`);
});