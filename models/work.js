const mongoose = require('mongoose');
const joi = require('joi');

//schema
const workSchema = new mongoose.Schema({
    work: {
        type: String,
        required: true,
        unique: true,
    }
});

function validate(work){
    const schema = {
        work: joi.string().required().min(3)
    }
    return joi.validate(work,schema);

}

module.exports = {
    workSchema: workSchema,
    validate: validate
}