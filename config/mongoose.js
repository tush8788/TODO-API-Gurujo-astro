const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost/todo-api-guruji-astro');

const db = mongoose.connection;

db.on('error',()=>{
    console.log("Error in connect DB");
})

db.once('open',()=>{
    console.log('Successfully connected to DB');
})

module.exports=db;