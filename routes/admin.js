const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const authController = require('../controller/auth_controller');
const passport = require('passport');

//create admin
router.post('/create',function(req,res,next){ req.body.isAdmin=true; next()},authController.createUser);

//create session
router.post('/createsession',authController.createSession);

//all users
router.get('/allusers',passport.authenticate('jwt',{session:false}),passport.adminOrNot,userController.allUsers);

//delete user
router.delete('/deleteuser/:id',passport.authenticate('jwt',{session:false}),passport.adminOrNot,userController.deleteUser);

//export
module.exports=router;