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

function validate(_work){
    const schema = {
        work: joi.string().required().min(3)
    }
    return joi.validate(_work,schema);

}

module.exports = {
    workSchema: workSchema,
    validate: validate
}