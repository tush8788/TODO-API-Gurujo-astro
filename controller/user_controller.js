const UserDB = require('../models/User');

module.exports.createUser = async function(req,res){
    try{
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