const mongoose = require('mongoose');
const {workSchema,validate} = require('../models/work');
const {addWork,getWork,getWorks,deleteWork,updateWork} = require('../database/work');
const express = require('express');
const Router = express.Router();

Router.get('/',async (req,res)=>{
    const works = await getWorks();
    return res.send(works);
});
Router.get('/:id', async (req,res)=>{
    const work = await getWork(req.params.id);
    if(!work) return res.status(400).send(`No work found with id ${req.params.id}`);
    return res.send(work);
});


module.exports = Router;