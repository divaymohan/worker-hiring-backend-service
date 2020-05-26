const mongoose =  require('mongoose');
const morgan = require('morgan');
const debug = require('debug')('app:main');
const express = require('express');
const helmet = require('helmet');

//start main app
const app = express();

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());

//connecting database
mongoose.connect('mongodb://localhost/worker-hiring-system',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>{debug( `Connected Database.`)})
    .catch(err=> debug(`Error in connecting ${err}`));

app.get('/',(req,res)=>{
    res.send("I am from worker backend service..");
})

//starting server at a port
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});