const mongoose = require('mongoose');
const {workerSchema} = require('../models/worker');

//creating model
const Worker = mongoose.model('Worker',workerSchema);

//get all workers
async function getWorkers(){
    return await Worker.find();
}
//get one worker by its id
async function getWorker(id){
    const worker = await Worker.findById(id);
    if(!worker) return;
    return worker;
}
//get one worker by username
async function getWorkerByUserName(_username){
    const worker = await Worker.findOne({userName: username});
    if(!worker) return;
    return worker;
} 
//get one worker by email
async function getWorkerByEmail(_email){
    const worker = await Worker.findOne({email: _email});
    if(!worker) return;
    return worker;
}