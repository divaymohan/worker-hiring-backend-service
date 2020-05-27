const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/databaseStartup')();
require('./startup/extraTools')(app);


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});