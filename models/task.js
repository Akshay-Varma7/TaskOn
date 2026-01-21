const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;//prop

const user = Schema({//or name : String
    name : {
        required : true,
    },
    email : {
        required : true,
    },
    password : {
        required : true,
    }
})

const task = Schema({
    task : {

    },
    done : Boolean,
    userId : ObjectId//not a string
})
