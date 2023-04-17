const express = require('express');
const db = require('./config/mongoose');
const port = 8000;

const app = express();

//extract data from urlencoded
app.use(express.urlencoded({extended:false}));

//handle url
app.use('/',require('./routes'));

//listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up on port : ${port}`);
});