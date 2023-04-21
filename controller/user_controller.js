const UserDB = require('../models/User');
const TaskDB = require('../models/Task');
//all users
module.exports.allUsers = async function (req, res) {
    try {
        //find users except login user and display only id and email address 
        let users = await UserDB.find({ _id: { $ne: req.user.id } }).select('email');

        return res.status(200).json({
            message: "All User",
            users
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//delete specific user
module.exports.deleteUser = async function (req, res) {
    try {
        // delete user
        await UserDB.findByIdAndDelete(req.params.id);

        // delete all task related to given user
        await TaskDB.deleteMany({ user: req.params.id });

        return res.status(200).json({
            message: "user and associated tasks delete successfully"
        });
    }
    catch (err) {
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";

        //Wrong Task id send
        if (err.name == "CastError") {
            statusCode = 403;
            message = "Wrong Task id send"
        }

        return res.status(statusCode).json({
            message: message
        })
    }
}