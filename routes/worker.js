const {getWorker,getWorkers,getWorkerByEmail,getWorkerByUserName,addWorker} = require('../database/worker');  
const {validate} = require('../models/worker');
const express = require('express');
const Router = express.Router();

//get all workers
Router.get('/',async (req,res)=>{
    res.send(await getWorkers());
});
//add new worker
Router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await addWorker(req.body);
    return res.send(result);
});


module.exports = Router;