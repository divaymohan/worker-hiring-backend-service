const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'exceptions.log' })
    );
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
}