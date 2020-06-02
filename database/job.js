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
