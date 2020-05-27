const mongoose = require('mongoose');
const joi = require('joi');
const debug = require('debug')('app:workerSchema');

//create schema for customer
const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true
    }, 
    middleName: {
        type: String,
        //required: true,
        minlength: 4,
        maxlength: 255,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true,
        default: this.firstName,
        unique: true
    },
    email: {
        type: String,
        minlength:5,
        maxlength: 255,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type:String,
        minlength: 8,
        maxlength: 255,
        required: true,
        trim: true
    },
    address:{
        type:  new mongoose.Schema({
            _id: {
                type: string
            },
            city:{
                type: String
            },
            area:{
                type: String
            },
            Pin:{
                type: Number,
                min: 000001,
                max: 999999
            }

        })
    },
    isSpecial: {
        type: Boolean,
        default: false
    }
    
});
//function to check the data from req.body of post requist
function validate(customer){
    const schema = {
        firstName: joi.string().min(4).max(255).required(),
        lastName: joi.string().max(255).min(4).required(),
        middleName: joi.string().max(255).min(4),
        userName: joi.string().max(255).min(4).alphanum(),
        email: joi.string().alphanum().email().required(),
        phoneNumber: joi.number().min(1000000000).max(9999999999),
        password: joi.alphanum().min(4).max(255).require(),
        addressId: joi.objectId(),
        isSpecial: joi.bool()
    }
    return joi.validate(customer,schema);

}

module.exports = {
    customerSchema: customerSchema,
    validate: validate
}