const mongoose = require("mongoose");
const joi = require("joi");
const debug = require("debug")("app:workerSchema");
const { workSchema } = require("../models/work");
const { addressSchema } = require("./address");
const jwt = require("jsonwebtoken");

//create schema for worker
const workerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
  },
  middleName: {
    type: String,
    //required: true,
    minlength: 4,
    maxlength: 255,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    trim: true,
    default: this.firstName,
    unique: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true,
    trim: true,
  },
  address: {
    type: addressSchema,
  },
  skills: {
    type: [
      new mongoose.Schema({
        _id: String,
        work: String,
      }),
    ],
    unique: false,
  },
  pricePerDay: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});
workerSchema.methods.generatesToken = function () {
  const token = jwt.sign(
    { _id: this._id, userName: this.userName, roll: "worker" },
    "jwtWebToken"
  );
  return token;
};
//function to check the data from req.body of post requist
function validate(worker) {
  const schema = {
    firstName: joi.string().min(4).max(255),
    lastName: joi.string().max(255).min(4),
    middleName: joi.string().max(255).min(4),
    userName: joi.string().max(255).min(4).required(),
    email: joi.string().email().required(),
    phoneNumber: joi.number().min(1000000000).max(9999999999).required(),
    password: joi.string().min(4).max(255).required(),
    address: joi.object(),
    workIds: joi.array().items(joi.objectId()),
    pricePerDay: joi.number().min(0),
    rating: joi.number().min(1).max(5),
  };
  return joi.validate(worker, schema);
}
//validation function to add skills
function validateSkills(_skills) {
  const schema = {
    skills: joi.array().items(joi.objectId()),
  };
  return joi.validate(_skills, schema);
}
//validate function to add rating
function validateRating(_rating) {
  const schema = {
    rating: joi.number().mon(1).max(5),
  };
  return joi.validate(_rating, schema);
}

module.exports = {
  workerSchema: workerSchema,
  validate: validate,
  validateSkills: validateSkills,
  validateRating: validateRating,
};
