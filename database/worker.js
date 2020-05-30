const mongoose = require('mongoose');
const {workerSchema} = require('../models/worker');
const {Work} = require('./work')
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
    const worker = await Worker.findOne({userName: _username});
    if(!worker) return;
    return worker;
} 
//get one worker by email
async function getWorkerByEmail(_email){
    const worker = await Worker.findOne({email: _email});
    if(!worker) return;
    return worker;
}
//add new 
async function addWorker(_worker){
    const skills=[];
    console.log(_worker.workIds);
    for(let i=0;i<_worker.workIds.length;i++){
        skills.push(await Work.findById(_worker.workIds[i]));
    }
    console.log(await Work.findById(_worker.workIds[0]));
    const worker = new Worker({
        firstName: _worker.firstName,
        lastName: _worker.lastName,
        middleName: _worker.middleName,
        userName: _worker.userName,
        email: _worker.email,
        phoneNumber: _worker.phoneNumber,
        password: _worker.password,
        skills: skills,
        pricePerDay: _worker.pricePerDay
    });
    return await worker.save();
}
//update a worker with id
async function updateWorker(id,_worker){
    const worker = await Worker.findById(id);
    if(!worker) return;
    if(_worker.firstName) worker.firstName = _worker.firstName;
    if(_worker.lastName) worker.lastName = _worker.lastName;
    if(_worker.middleName) worker.middleName = _worker.middleName;
    if(_worker.email) worker.email = _worker.email;
    if(_worker.userName) worker.userName = _worker.userName;
    if(_worker.phoneNumber) worker.phoneNumber = _worker.phoneNumber; 
    if(_worker.password) worker.password = _worker.password;
    if(_worker.pricePerDay) worker.pricePerDay = _worker.pricePerDay;
    return await _worker.save();
}
//update the address


//add the skills
async function addSkills(id,_skills){
    const worker = await Worker.findById(id);
    if(!worker) return;
    for(let i =0;i< _skills.skills.length;i++){
        let work = await Work.findById(_skills.skills[i]);
        worker.skills.push(work);
    }
    return await worker.save();
}


//remove the skills


//update the workers details


//delete one worker with id
async function deleteWorker(id){
    return await Worker.deleteOne({_id: id});
}


module.exports = {
    getWorker: getWorker,
    getWorkerByEmail: getWorkerByEmail,
    getWorkerByUserName: getWorkerByUserName,
    getWorkers: getWorkers,
    addWorker: addWorker
}