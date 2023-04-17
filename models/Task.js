const mongoose = require('mongoose');
//schema 
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["completed","incomplete"],
        default:"incomplete",
    }
},{
    timestamps:true
});

//create model
const Task = mongoose.model("Task",taskSchema);

//export
module.exports = Task