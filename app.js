const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel : User, TaskModel : Task, TaskModel} = require("./models/models.js");//as we deconstruct using keys
const {auth ,JWT_SECRET} = require("./auth/auth.js");
const app = express();

app.use(express.json());//to pass json body

async function main(){//mongodb://127.0.0.1:27017/TaskOn -for db running on my machine-localhost:mongoDB port/db
    try{
        await mongoose.connect("mongodb+srv://username:password@cluster0.ettblac.mongodb.net/TaskOn");//somewhere in cloud
        //if not pthere it will try to connect to local mongogdb database (which we dont have/wont use right now)
    }catch(err){
        console.log(err.message);
    }
}

main();
//MongoDB collections are schema-less(no sql/schema flexibility), but Mongoose models enforce a schema at the application level.//one collection for one model
app.post("/signup",async (req,res)=>{//async - due to req to db
    const {email,password,name} = req.body;
    //to db
    await User.create({//sometimes this insertion may fail due to constraints defined for fields in schema
        email : email,
        password : password,
        name : name   
    })
    res.send({
        message : "signed up!"
    })
    alert("you are signed up!");
})

app.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    //search in db
    const user = User.find({//returns sucn document(object)-if many such an array of objects
        email : email,
        password : password
    });
    //if yes-jwt token otherwise error
    if(user){
        const token = jwt.sign({//payload-what do you want to store
            id : user._id//this time how do we uniquely identify an user-by ObjectId(not only usernames or email-actually they shld be unique so they can also be used)
        },JWT_SECRET);
        res.send({
            token : token
        })
        localStorage.setItem("token",token);
    }else{
        res.status(403).send({
            message : "wrong credentials!"
        })
    }
})
//tasks-authenticated endpoints
app.get("/tasks",auth,(req,res)=>{

})
app.post("/task/add",auth,async (req,res)=>{
    const userId = req.userId;
    const { task, done } = req.body;

    await TaskModel.create({
        userId,
        task,
        done
    });
    res.send({
        message : "task created"
    })
})
app.patch("/task/edit",auth,(req,res)=>{
    
})
app.delete("/task/delete",auth,(req,res)=>{
    
})

app.listen(8080,()=>{
    console.log(`listening to port : 8080`);
});
//in js-obj can have-classes,objects,arrays,functions,all as properties