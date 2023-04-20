const express = require('express');
const router = express.Router();
// const adminController = require('../controller/admin_controller');
const authController = require('../controller/auth_controller');

//create admin
router.post('/create',function(req,res,next){ req.body.isAdmin=true; next()},authController.createUser);

//create session
router.post('/createsession',authController.createSession);

//export
module.exports=router;