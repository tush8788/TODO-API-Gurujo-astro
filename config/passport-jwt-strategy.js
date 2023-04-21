const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtactJwt = require('passport-jwt').ExtractJwt;
const UserDB = require('../models/User');

//options jwt
let opts = {
    jwtFromRequest : ExtactJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}
//middle-ware
passport.use(new jwtStrategy(opts, async function(jwtpayload,done){
    try{
        //find user in db
        let user = await UserDB.findById(jwtpayload._id);
        //user not found or password not match
        if(!user || user.password != jwtpayload.password){
            console.log("Invaild token");
            return done(null,false);
        }
        //user found and password match
        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}))

//check reqested user admin or not
passport.adminOrNot = function(req,res,next){
    if(req.user.isAdmin==true){
        return next();
    }
    return res.status(401).json({
        message:"Unauthorized"
    })
}

//export
module.exports=passport;