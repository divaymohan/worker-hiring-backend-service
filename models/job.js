const mongoose = require("mongoose");
const joi = require("joi");

//schema

const jobSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      _id: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
    }),
    required: true,
  },
  worker: {
    type: new mongoose.Schema({
      _id: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      pricePerDay: {
        type: Number,
        // required: true,
        min: 0,
      },
    }),
    required: true,
  },
  dateStart: {
    type: Date,
    default: Date.now,
  },
  dateEnd: {
    type: Date,
  },
  numberOfDays: {
    type: Number,
    min: 1,
  },
  jobRating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

function validate(job) {
  const schema = {
    customerId: joi.string().required(),
    workerId: joi.string().required(),
    dateStart: joi.date(),
    dateEnd: joi.date(),
    numberOfDays: joi.number().min(1),
    jobRating: joi.number().min(0).max(5),
  };
  return joi.validate(job, schema);
}
function validateHistory(req) {
  const schema = {
    _id: joi.string().required(),
  };
  return joi.validate(req, schema);
}
function validateRating(_rating) {
  const schema = {
    rating: joi.number().min(0).max(5),
  };
  return joi.validate(_rating, schema);
}

module.exports = {
  validate,
  jobSchema,
  validateHistory,
  validateRating,
};
