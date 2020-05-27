const mongoose = require('mongoose');
const winston = require('winston');
const debug = require('debug');

module.exports = function(){
    mongoose.connect('mongodb://localhost/worker-hiring-system',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>{console.log('Database is Connected..')})
    .catch(err=> console.log(`Error in connecting ${err}`));
} 

