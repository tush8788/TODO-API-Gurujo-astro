const TaskDB = require('../models/Task');

//get all task
module.exports.getAllTasks = async function (req, res) {
    try {
        //find all task
        let allTasks = await TaskDB.find({});

        return res.status(200).json({
            message: "All Tasks",
            allTasks
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
        //create new task
        let Task = await TaskDB.create(req.body);

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
        //update task
        await TaskDB.findByIdAndUpdate(req.params.id, req.body);

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
        //find task and delete 
        await TaskDB.findByIdAndDelete(req.params.id);

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