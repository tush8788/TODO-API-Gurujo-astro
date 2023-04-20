const UserDB = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');
//create user
module.exports.createUser = async function(req,res){
    try{
        // console.log(req.body)
        if(req.body.password != req.body.confirmpassword){
            return res.status(401).json({
                message: "Password not match",
            })    
        }

        let user = await UserDB.findOne({email:req.body.email});

        if(!user){
            user = await UserDB.create(req.body);
            return res.status(201).json({
                message: "User Create Successfuly",
            })
        }

        return res.status(401).json({
            message: "User aready exist",
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "error"
        })
    }
}

//create session 
module.exports.createSession=async function(req,res){
    try{
        let user = await UserDB.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(402).json({
                message:"email or password not match"
            });
        }

        return res.status(200).json({
            message:"user successfully login",
            Token:jsonwebtoken.sign(user.toJSON(),"secret",{expiresIn:1000*60*100})
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"email or password not match"
        });
    }
}