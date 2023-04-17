const express = require('express');
//task controller
const taskController = require('../controller/task_controller');
const router = express.Router();

//all task
router.get('/task',taskController.getAllTasks);
//get single task
router.get('/task/:id',taskController.viewTask);
//create new Task
router.post('/task',taskController.createTask);
//update task
router.put('/task/:id',taskController.updateTask);
//delete task
router.delete('/task/:id',taskController.deleteTask);

//export
module.exports=router;