const mongoose =  require('mongoose');
const morgan = require('morgan');
const debug = require('debug')('app:main');
const express = require('express');
const helmet = require('helmet');

require('./startup/databaseStartup')();

//start main app
const app = express();

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());



app.get('/',(req,res)=>{
    res.send("I am from worker backend service..");
})

//starting server at a port
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});