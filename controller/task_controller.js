const TaskDB = require('../models/Task');

//get all task
module.exports.getAllTasks = async function (req, res) {
    try {
        //add pagination 
        let page = 1, limit = 0, count = 0;
        //if user send page number then
        if (req.query.page) {
            page = parseInt(req.query.page);
            limit = 2;
        }
        let allTasks
        if (req.user.isAdmin == true) {
            //find all task
            allTasks = await TaskDB.find({}).skip((page - 1) * limit).limit(limit);
            //count total tasks
            count = await TaskDB.find({}).countDocuments();
            //find how many pages
            count = Math.round(count / 2);
        }
        else {
            //find all task user specific 
            allTasks = await TaskDB.find({ user: req.user.id }).skip((page - 1) * limit).limit(limit);
            //find how many pages
            count = await TaskDB.find({ user: req.user.id }).skip((page - 1) * limit).limit(2).countDocuments();
        }

        return res.status(200).json({
            message: "All Tasks",
            allTasks,
            pages: count
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
        //if task not found or req user and task user is diffrent then
        if (!Task || Task.user != req.user.id) {
            return res.status(401).json({
                message: "Unauthorize to delete task or task not found"
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
        //wrong task id 
        if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }
        //return res
        return res.status(statusCode).json({
            message: message
        })
    }
}

//create new task
module.exports.createTask = async function (req, res) {
    try {
        //if reqested user is admin then admin can not create task
        if (req.user.isAdmin == true) {
            return res.status(400).json({
                message: "Admin Can not create task"
            })
        }

        let { title, description, status } = req.body;
        //create new task
        let Task = await TaskDB.create({
            title: title,
            description: description,
            status: status,
            user: req.user.id
        });

        return res.status(201).json({
            message: "New Task Created",
            Task
        })
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";
        // field validation or field missing error
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
        //if reqested user is admin then admin can not update task
        if (req.user.isAdmin == true) {
            return res.status(400).json({
                message: "Admin Can not update task"
            })
        }
        //find task in DB
        let task = await TaskDB.findById(req.params.id);
        //if task not found or req user and task user is diffrent then
        if (!task || task.user != req.user.id) {
            return res.status(402).json({
                message: "Unauthorize to delete task or task not found"
            })
        }
        //task update
        await task.updateOne(req.body);
        //return res
        return res.status(200).json({
            message: "Task update successfully",
        })
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";
        //field missing error
        if (err.name == "ReferenceError") {
            statusCode = 403;
            message = "field missing error";
        }
        //Wrong Task id send
        else if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }
        //field missmatch
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

        // find task and delete 
        let task = await TaskDB.findById(req.params.id);
        // if user is admin then delete task 
        if (req.user.isAdmin == true) {
            //if task not found 
            if (!task) {
                return res.status(404).json({
                    message: "task not found"
                })
            }
        }
        //if task not found or task user or req user is diff
        else if (!task || task.user != req.user.id) {
            return res.status(404).json({
                message: "Unauthorize to delete task or task not found"
            })
        }
        //delete task
        await task.deleteOne();

        return res.status(200).json({
            message: "Task delete successfully",
        })
    }
    catch (err) {
        console.log(err);
        let statusCode = 500, message = "Internal Server Error";
        // Wrong Task id send
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
module.exports.taskStatusWise = async function (req, res) {
    try {
        let tasks;
        //all tasks 
        if (req.user.isAdmin == true) {
            tasks = await TaskDB.find({ status: req.params.status });
        }
        //user specific tasks
        else {
            tasks = await TaskDB.find({ user: req.user.id, status: req.params.status });
        }
        return res.status(200).json({
            message: "Tasks",
            tasks
        })
    }
    catch (err) {
        console.log(err);
        let statusCode = 500, message = "Internal Server Error";

        return res.status(statusCode).json({
            message: message
        })
    }
}
