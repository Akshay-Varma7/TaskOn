const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel : User, TaskModel : Task, TaskModel} = require("./models/models.js");//as we deconstruct using keys
const {auth} = require("./auth/auth.js");
require("dotenv").config();//can be loaded once(server file) no need to load in any other
const app = express();

app.use(express.json());//to pass json body

async function main(){//mongodb://local ip:27017(usual mongodb port)/TaskOn -for db running on my machine
    try{
        await mongoose.connect(DB_URL);//somewhere in cloud
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
        //hashing is a one way process-pswd to hash but not hash to pswd //not encryption(2 way process)
        //for that we have hashing algorithms

        //DOWNSIDE-what if 2 people have same pswd-same hash
        //A.2 solved by salting pswd(random string addn)-then hashing

        //store their : hashed pswd + salt
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
    //A.2server takes the pswd+salt(bring from db)- then hash -&check

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

app.listen(PORT,()=>{
    console.log(`listening to port : ${PORT}`);
});
//in js-obj can have-classes,objects,arrays,functions,all as properties