const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin_controller');

//create admin
router.post('/create',adminController.createAdmin);

//create session
router.post('/createsession',adminController.createSession);

//export
module.exports=router;