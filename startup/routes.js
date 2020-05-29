const express = require('express');
const _work = require('../routes/work');
const _address = require('../routes/address'); 
module.exports = function(app){
    app.use(express.json());
    app.use('/api/hiring/work',_work);
    app.use('/api/hiring/address',_address);
}