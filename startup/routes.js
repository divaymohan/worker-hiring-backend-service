const express = require('express');
const _work = require('../routes/work');
const _address = require('../routes/address'); 
const _worker = require('../routes/worker');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/hiring/work',_work);
    app.use('/api/hiring/address',_address);
    app.use('/api/hiring/workers',_worker);

}