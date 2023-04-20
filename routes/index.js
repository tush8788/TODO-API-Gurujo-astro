const express = require('express');
const router = express.Router();

//task
router.use('/task',require('./task'));
//user 
router.use('/user',require('./user'));

//export
module.exports=router;