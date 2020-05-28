const express = require('express');
const _work = require('../routes/work'); 
module.exports = function(app){
    app.use(express.json());
    app.use('/api/hiring',_work);
   
}