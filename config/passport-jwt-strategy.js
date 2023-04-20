const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtactJwt = require('passport-jwt').ExtractJwt;
const UserDB = require('../models/User');

let opts = {
    jwtFromRequest : ExtactJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

passport.use(new jwtStrategy(opts, async function(jwtpayload,done){
    try{
        let user = await UserDB.findById(jwtpayload._id);
        if(!user || user.password != jwtpayload.password){
            console.log("Invaild token");
            return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}))

module.exports=passport;