const {getWorker,getWorkers,getWorkerByEmail,getWorkerByUserName,addWorker,addSkills,removeSkills,updateWorker,deleteWorker} = require('../database/worker');  
const {validate,validateSkills} = require('../models/worker');
const express = require('express');
const Router = express.Router();

//get all workers
Router.get('/',async (req,res)=>{
    return res.send(await getWorkers());
});
//get one worker
Router.get('/:id',async (req,res)=>{
    const worker =  await getWorker(req.params.id);
    if(!worker) return res.status(400).send(`No worker found with id ${req.params.id}`);
    return res.send(worker);
});
//get one worker by email
Router.get('/byEmail/:email',async (req,res)=>{
    const worker =  await getWorkerByEmail(req.params.email);
    if(!worker) return res.status(400).send(`No worker found with email ${req.params.email}`);
    return res.send(worker);
});

//get one worker by its usename
Router.get('/byUname/:uname',async (req,res)=>{
    const worker =  await getWorkerByUserName(req.params.uname);
    if(!worker) return res.status(400).send(`No worker found with uname ${req.params.uname}`);
    return res.send(worker);
});

//add new worker
Router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await addWorker(req.body);
    return res.send(result);
});
//update worker
Router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await updateWorker(req.params.id,req.body);
    if(!result) return res.status(400).send(`No worker found with id ${req.params.id}`);
    return res.send(result);
});
//add skills to a existing worker
Router.put('/add/skill/:id',async (req,res)=>{
    const {error} = validateSkills(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await addSkills(req.params.id,req.body)
    if(!result) return res.status(400).send(`No worker found with id ${req.params.id}`);
    return res.send(result);
}); 
//remove skills
Router.delete('/remove/skill/:id',async (req,res)=>{
    const {error} = validateSkills(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await removeSkills(req.params.id,req.body);
    if(!result) return res.status(400).send(`No worker found with id ${req.params.id}`);
    return res.send(result);
});
//remove worker
Router.delete('/:id',async (req,res)=>{
    const result = await deleteWorker(req.params.id);
    if(result.n==0) return res.status(400).send(`No worker found with id ${req.params.id}`);
    return res.send(result);
}); 


module.exports = Router;