const mongoose = require("mongoose");
const joi = require("joi");

//schema
const workSchema = new mongoose.Schema({
  work: {
    type: String,
    required: true,
  },
});

function validate(_work) {
  const schema = {
    work: joi.string().min(3).required(),
  };
  return joi.validate(_work, schema);
}

module.exports = {
  workSchema: workSchema,
  validate: validate,
};
