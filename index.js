const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/databaseStartup')();
require('./startup/extraTools')(app);
require('./startup/validation')();
require('./startup/logging')();
require('./startup/config');


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    winston.info(`listening at port ${port}`);
});