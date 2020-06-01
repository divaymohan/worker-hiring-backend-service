const mongoose = require("mongoose");
const debug = require("debug")("app:addressModel");
const joi = require("joi");

//address schema
const addressSchema = new mongoose.Schema({
  houseNumber: {
    type: Number,
  },
  city: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  country: {
    type: String,
    default: "India",
    minlength: 4,
    maxlength: 20,
  },
  pin: {
    type: Number,
    min: 100000,
    max: 999999,
  },
  street: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  area: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  landmark: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
});
function validate(address) {
  const schema = {
    houseNumber: joi.number(),
    city: joi.string().min(3).max(50),
    country: joi.string().min(3).max(50),
    pin: joi.number().min(100000).max(999999),
    street: joi.string().min(3).max(255),
    area: joi.string().min(3).max(255),
    landmark: joi.string().min(3).max(255),
  };
  return joi.validate(address, schema);
}

module.exports = {
  addressSchema: addressSchema,
  validate: validate,
};
