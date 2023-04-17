const mongoose = require('mongoose');

//remove additional validation on query
mongoose.set('strictQuery',false);

//set url
mongoose.connect('mongodb://localhost/todo-api-guruji-astro');

//got connection
const db = mongoose.connection;

//handle errpr
db.on('error',()=>{
    console.log("Error in connect DB");
})

//if connection successfully
db.once('open',()=>{
    console.log('Successfully connected to DB');
})

//export 
module.exports=db;