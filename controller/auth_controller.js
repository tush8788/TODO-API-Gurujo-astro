const UserDB = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');

//create user
module.exports.createUser = async function(req,res){
    try{
        //password or confirmpassword not match
        if(req.body.password != req.body.confirmpassword){
            return res.status(401).json({
                message: "Password not match",
            })    
        }

        //check user already exist or not 
        let user = await UserDB.findOne({email:req.body.email});

        if(!user){
            // create new user
            user = await UserDB.create(req.body);
            return res.status(201).json({
                message: "User Create Successfuly",
            })
        }
        //if user already exist
        return res.status(401).json({
            message: "User aready exist",
        })
    }
    catch(err){
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";
        //field missing error
        if (err.name == "ReferenceError") {
            statusCode = 403;
            message = "field missing error";
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

//create session 
module.exports.createSession=async function(req,res){
    try{
        //find user in db
        let user = await UserDB.findOne({email:req.body.email});
        //user not found and password missmactch 
        if(!user || user.password != req.body.password){
            return res.status(402).json({
                message:"email or password not match"
            });
        }

        //return token
        return res.status(200).json({
            message:"user successfully login",
            //genrate token
            Token:jsonwebtoken.sign(user.toJSON(),"secret",{expiresIn:1000*60*100})
        })
    }
    catch(err){
        console.log(err);

        let statusCode = 500, message = "Internal Server Error";
        //field missing error
        if (err.name == "ReferenceError") {
            statusCode = 403;
            message = "field missing error";
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