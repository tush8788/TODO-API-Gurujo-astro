const express = require('express');
const taskController = require('../controller/task_controller');
const router = express.Router();

router.get('/task',taskController.getAllTasks);

module.exports=router;
