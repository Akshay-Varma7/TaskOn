const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;//prop

const UserSchema = Schema({//or name : String
    name : {
        type : String,
        unique : true,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const TaskSchema = Schema({
    task : String,
    done : Boolean,
    userId : ObjectId//not a string
})
//creating models
const UserModel = mongoose.model('User',UserSchema);//collection(in which),schema(to be used)-can be captured using any variable name
//creates a collection if dne
const TaskModel = mongoose.model('Task',TaskSchema);//returns a model
//collection name-(as Model) ex:Users(as model)->users(collections)-if exist use if not create and model name,schema name can be anything

module.exports={UserModel ,TaskModel};//for exporting many we use an object
//follow caps for models,schema