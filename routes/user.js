const express = require('express');
const authController = require('../controller/auth_controller');
const router = express.Router();

//create user 
router.post('/create',authController.createUser);

//create session
router.post('/createsession',authController.createSession);

module.exports=router;