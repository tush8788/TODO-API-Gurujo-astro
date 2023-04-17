const TaskDB = require('../models/Task');

module.exports.getAllTasks = async function(req,res){
    try{
        let allTasks = await TaskDB.find({});
        return res.status(200).json({
            message:"done",
            allTasks
        })
    }
    catch(err){
        return res.status(400).json({
            message:"error"
        })
    }
}