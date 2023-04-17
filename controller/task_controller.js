const TaskDB = require('../models/Task');

//get all task
module.exports.getAllTasks = async function(req,res){
    try{
        let allTasks = await TaskDB.find({});
        return res.status(200).json({
            message:"All Tasks",
            allTasks
        })
    }
    catch(err){
        return res.status(400).json({
            message:"error"
        })
    }
}

//view task
module.exports.viewTask = async function(req,res){
    try{
        let Task = await TaskDB.findById(req.params.id);
        return res.status(200).json({
            message:"Task",
            Task
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//create task
module.exports.createTask = async function(req,res){
    try{
        let Task = await TaskDB.create(req.body);
        return res.status(201).json({
            message:"New Task Created",
            Task
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//update task
module.exports.updateTask = async function(req,res){
    try{
        await TaskDB.findByIdAndUpdate(req.params.id,req.body);

        return res.status(200).json({
            message:"Task update successfully",
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//delete task
module.exports.deleteTask = async function(req,res){
    try{
        await TaskDB.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Task delete successfully",
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}