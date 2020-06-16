const mongoose = require("mongoose");
const joi = require("joi");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
function validate(user) {
  const schema = {
    userName: joi.string().required().min(3).max(50),
    password: joi.string().required().min(3).max(1500),
    roll: joi.string().required(),
  };
  const result = joi.validate(user, schema);
  return result;
}

module.exports = {
  schema,
  validate,
};
