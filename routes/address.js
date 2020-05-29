const {addAddress,getAddress,getAddresses,updateAddress,deleteAddress} = require('../database/address');
const {validate} = require('../models/address');

const express = require('express');
const Router = express.Router();

Router.get('/',async (req,res)=>{
    const result = await getAddresses();
    return res.send(result);
});
Router.get('/:id',async (req,res)=>{
    const result = await getAddress(req.params.id);
    if(!result) res.status(400).send(`no address found with id ${req.params.id}`)
    return res.send(result);
});
Router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await addAddress(req.body);
    return res.send(result);
});
Router.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await updateAddress(req.params.id,req.body);
    return res.send(result);
});
Router.delete('/:id',async (req,res)=>{
    const result = await deleteAddress(req.params.id);
    if(result.n==0) return res.status(400).send(`No Address found with id ${req.params.id}`);
    return res.send(result);
});

module.exports = Router;