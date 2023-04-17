const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["completed","incomplete"],
        default:"incomplete",
    }
});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task