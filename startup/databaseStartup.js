const mongoose = require('mongoose');
const winston = require('winston');
const debug = require('debug');

module.exports = function(){
    mongoose.connect('mongodb://localhost/worker-hiring-system',{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>{winston.info('Database is Connected..')});
} 

