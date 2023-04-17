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