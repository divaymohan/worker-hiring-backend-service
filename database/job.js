const mongoose = require("mongoose");
const { jobSchema } = require("../models/job");
const { Customer } = require("./customers");
const { Worker } = require("./worker");
//modell
const Job = mongoose.model("Job", jobSchema);

//get all jobs
async function getJobs() {
  return await Job.find();
}
//get by id
async function getJob(id) {
  const job = await Job.findById(id);
  if (!job) return;
  return job;
}
//create job
async function addJob(_job) {
  const customer = await Customer.findById(_job.customerId);
  if (!customer) return;
  const worker = await Worker.findById(_job.workerId);
  if (!worker) return;
  const job = new Job({
    customer: customer,
    worker: worker,
    dateStart: _job.dateStart,
    dateEnd: _job.dateEnd,
    numberOfDays: _job.numberOfDays,
  });
  return await job.save();
}
async function cancleJob(_id) {
  const job = await Job.findById(_id);
  if (!job) return;
  const result = await Job.deleteOne({ _id: _id });
  return result;
}
async function getWorkerHistory(workerId) {
  const customers = await Job.find({
    "worker._id": workerId,
  });
  return customers;
}
async function getCustomerHistory(custId) {
  const customers = await Job.find({
    "customer._id": custId,
  });
  return customers;
}
async function updateRating(_id, _rating) {
  const job = await Job.findById(_id);
  if (!job) return;
  job.jobRating = _rating.rating;
  return await job.save();
}
async function updateCancleStatus(_id, _cancle) {
  const job = await Job.findById(_id);
  if (!job) return;
  job.isCancled = _cancle.isCancled;
  return await job.save();
}
async function updateAcceptState(_id, _accept) {
  const job = await Job.findById(_id);
  if (!job) return;
  job.isAccepted = _accept.isAccepted;
  return await job.save();
}

module.exports = {
  getJob,
  addJob,
  getJobs,
  getWorkerHistory,
  getCustomerHistory,
  updateRating,
  updateCancleStatus,
  updateAcceptState,
};
