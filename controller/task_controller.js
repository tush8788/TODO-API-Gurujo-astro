const TaskDB = require('../models/Task');

//get all task
module.exports.getAllTasks = async function (req, res) {
    try {
        //add pagination 
        let page=1,limit=0,count=0;
        if(req.query.page){
            page=parseInt(req.query.page);
            limit=2;
        }
        let allTasks
        if(req.user.isAdmin==true){
            //find all task
            allTasks = await TaskDB.find({}).skip((page-1)*limit).limit(limit);
            // count = await TaskDB.find({}).skip((page-1)*limit).limit(2).countDocuments();
            count = await TaskDB.find({}).countDocuments();
            count = Math.round(count/2);
            // console.log(count);
        }
        else{
            allTasks = await TaskDB.find({user:req.user.id}).skip((page-1)*limit).limit(limit);
            count = await TaskDB.find({}).skip((page-1)*limit).limit(2).countDocuments();
            // console.log(count);
        }
        
        return res.status(200).json({
            message: "All Tasks",
            allTasks,
            pages:count
        })
    }
    catch (err) {
        console.log(err);

        return res.status(400).json({
            message: "error"
        })
    }
}

//view specific task
module.exports.viewTask = async function (req, res) {
    try {
        //find task by id
        let Task = await TaskDB.findById(req.params.id);

        if(!Task||Task.user != req.user.id){
            return res.status(401).json({
                message:"Unauthorize to delete task or task not found"
            })
        }

        return res.status(200).json({
            message: "Task",
            Task
        })
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";

       if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }

        return res.status(statusCode).json({
            message: message
        })
    }
}

//create new task
module.exports.createTask = async function (req, res) {
    try {
        //if reqested user is admin then admin can not create task
        if(req.user.isAdmin==true){
            return res.status(400).json({
                message:"Admin Can not create task"
            })
        }

        let {title,description,status} = req.body;
        //create new task
        let Task = await TaskDB.create({
            title:title,
            description:description,
            status:status,
            user:req.user.id
        });

        return res.status(201).json({
            message: "New Task Created",
            Task
        })
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";

        if (err.name == "ValidationError") {
            statusCode = 403;
            message = "field validation or field missing error";
        }

        return res.status(statusCode).json({
            message: message
        })
    }
}

//update task
module.exports.updateTask = async function (req, res) {
    try {
         //if reqested user is admin then admin can not create task
         if(req.user.isAdmin==true){
            return res.status(400).json({
                message:"Admin Can not update task"
            })
        }

        let task = await TaskDB.findById(req.params.id);
        
        if(!task||task.user != req.user.id){
            return res.status(402).json({
                message:"Unauthorize to delete task or task not found"
            })
        }
        await task.updateOne(req.body);
    
        return res.status(200).json({
            message: "Task update successfully",
        })
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";

        if (err.name == "ReferenceError") {
            statusCode = 403;
            message = "field missing error";
        }
        else if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }
        else if (err.name == "TypeError") {
            statusCode = 403;
            message = "field missmatch"
        }

        return res.status(statusCode).json({
            message: message
        })
    }
}

//delete task
module.exports.deleteTask = async function (req, res) {
    try {

        // //find task and delete 
        // await TaskDB.findByIdAndDelete(req.params.id);
        let task = await TaskDB.findById(req.params.id);
        if(req.user.isAdmin==true){
            if(!task){
                return res.status(404).json({
                    message:"task not found"
                })
            }
        }
        else if(!task || task.user != req.user.id){
            return res.status(404).json({
                message:"Unauthorize to delete task or task not found"
            })
        }

        await task.deleteOne();

        return res.status(200).json({
            message: "Task delete successfully",
        })
    }
    catch (err) {
        console.log(err);
        let statusCode = 500, message = "Internal Server Error";

        if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }

        return res.status(statusCode).json({
            message: message
        })
    }
}

//sort task given status
module.exports.taskStatusWise = async function(req,res){
    try{
        let tasks;
        if(req.user.isAdmin==true){
            tasks = await TaskDB.find({status:req.params.status});
        }
        else{
            tasks = await TaskDB.find({user:req.user.id,status:req.params.status});
        }
        return res.status(200).json({
            message:"Tasks",
            tasks
        })
    }
    catch(err){
        console.log(err);
        let statusCode = 500, message = "Internal Server Error";

        return res.status(statusCode).json({
            message: message
        }) 
    }
}
