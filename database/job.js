const mongoose = require("mongoose");
const { jobSchema, validate } = require("../models/job");
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
async function addJob(_job) {}
