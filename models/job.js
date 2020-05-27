const mongoose = require('mongoose');
const joi = require('joi');

//schema

const jobSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true,
            },
            userName: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            }
        }),
        required:true

    },
    worker:{
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true,
            },
            userName: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            },
            pricePerDay:{
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true

    },
    dateStart:{
        type: Date,
        default: Date.now
    },
    dateEnd:{
        type: Date
    }
}); 

function validate(job){
    const schema = {
        customerId: joi.ObjectId().require(),
        workerId: joi.ObjectId().required(),
        dateStart: joi.Date(),
        dateEnd: joi.Date()
    }
    return joi.validate(job,schema);
}