const express = require('express');
const _work = require('../routes/work'); 
module.exports = function(app){
    app.use('/api/hiring',_work);
    app.use(express.json());
}