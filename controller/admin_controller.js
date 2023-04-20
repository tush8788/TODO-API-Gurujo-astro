const UserDB = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');

//create admin
module.exports.createAdmin = async function(req,res){
    try{
        let {email,password,confirmpassword} = req.body;
        if(password != confirmpassword){
            return res.status(401).json({
                message:"password or confirm password not match"
            })
        }

        let admin = await UserDB.findOne({email:email});

        if(!admin){
            admin = await UserDB.create({email:email,password:password,isAdmin:true});
            return res.status(201).json({
                message:"new admin created"
            })
        }

        return res.status(400).json({
            message:"admin or user already exist"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message:"admin or user already exist"
        })
    }
}

//create session
module.exports.createSession=async function(req,res){
    try{
        let {email, password} = req.body;
        
        let admin = await UserDB.findOne({email:email,isAdmin:true});

        if(!admin || password != admin.password){
            return res.status(400).json({
                message:"email or password not match"
            })
        }

        return res.status(200).json({
            message:"Admin auth successfully",
            Token:jsonwebtoken.sign(admin.toJSON(),"secret",{expiresIn:1000*60*100})
        })

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal server error",
            Token:jsonwebtoken.sign(admin.toJSON(),"secret",{expiresIn:1000*60*100})
        })
    }
}