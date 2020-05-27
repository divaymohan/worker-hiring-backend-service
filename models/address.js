const mongoose = require('mongoose');
const debug = require('debug')('app:addressModel');
const joi = require('joi');

//address schema
const addressSchema = new mongoose.Schema({
    houseNumber:{
        type: Number
    },
    city:{
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true

    },
    country:{
        type: String,
        default: 'India',
        minlength:4,
        maxlength: 20

    },
    pin:{
        type:Number,
        minlength: 6,
        maxlength: 6,
        required: true

    },
    street:{
        type: String,
        minlength:2,
        maxlength:255,
        required: true

    },
    area:{
        type: String,
        minlength:3,
        maxlength: 255

    },
    landmark:{
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true

    }
   

});

function validate(address){
    const schema = {
        houseNumber: joi.number(),
        city: joi.string().min(3).max(50).required(),
        country: joi.string().min(3).max(50).required(),
        pin: joi.number().min(6).max(6).required(),
        street: joi.string().min(3).max(255),
        area: joi.string().min(3).max(255),
        landmark: joi.string().min(3).max(255).required()
    }
    return joi.validate(address,schema);

}

module.exports = {
    addressSchema: addressSchema,
    validate: validate
}