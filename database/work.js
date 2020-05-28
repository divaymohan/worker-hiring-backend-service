const mongoose = require('mongoose');
const {workSchema,validate} = require('../models/work');

//modal
const Work = mongoose.model('Work',workSchema);

async function getWorks(){
    return await Work.find();
}

async function getWork(id){
    const work = await Work.findById(id);
    if(!work) return;
    return work;
}

async function addWork(_work){
    const work = new Work({
        work: _work.work
    });
    return await work.save();
}

async function updateWork(id,_work){
    const work = await Work.findById(id);
    if(!work) return;
    work.work = _work.work;
    return await work.save();
}

async function deleteWork(id){
    return await Work.deleteOne({_id:id});
}

