const express = require('express');
const taskController = require('../controller/task_controller');
const router = express.Router();
const passport = require('passport');

//all task
router.get('/',passport.authenticate('jwt',{session:false}),taskController.getAllTasks);

//get single task
router.get('/:id',passport.authenticate('jwt',{session:false}),taskController.viewTask);

//create new Task
router.post('/',passport.authenticate('jwt',{session:false}),taskController.createTask);

//update task
router.put('/:id',passport.authenticate('jwt',{session:false}),taskController.updateTask);

//delete task
router.delete('/:id',passport.authenticate('jwt',{session:false}),taskController.deleteTask);

router.get('/status/:status',passport.authenticate('jwt',{session:false}),taskController.taskStatusWise);

//export
module.exports=router;