const mongoose = require("mongoose");
const { workerSchema } = require("../models/worker");
const { addressSchema } = require("../models/address");
const { Address, addAddress, updateAddress } = require("./address");
const { Work } = require("./work");
const bcrypt = require("bcrypt");
//creating model
const Worker = mongoose.model("Worker", workerSchema);

//get all workers
async function getWorkers() {
  return await Worker.find();
}
//get one worker by its id
async function getWorker(id) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  return worker;
}
//get one worker by username
async function getWorkerByUserName(_username) {
  const worker = await Worker.findOne({ userName: _username });
  if (!worker) return;
  return worker;
}

//get one worker by email
async function getWorkerByEmail(_email) {
  const worker = await Worker.findOne({ email: _email });
  if (!worker) return;
  return worker;
}
//add new
async function addWorker(_worker) {
  const skills = [];
  if (_worker.workIds) {
    for (let i = 0; i < _worker.workIds.length; i++) {
      let work = await Work.findById(_worker.workIds[i]);
      work = {
        _id: work._id,
        work: work.work,
      };
      skills.push(work);
    }
  }

  const worker = new Worker({
    firstName: _worker.firstName,
    lastName: _worker.lastName,
    middleName: _worker.middleName,
    userName: _worker.userName,
    email: _worker.email,
    phoneNumber: _worker.phoneNumber,
    password: _worker.password,
    skills: skills,
    pricePerDay: _worker.pricePerDay,
  });
  const salt = await bcrypt.genSalt(10);
  worker.password = await bcrypt.hash(worker.password, salt);
  if (_worker.address) {
    const address = await addAddress(_worker.address);
    worker.address = address;
  }
  return await worker.save();
}
//update a worker with id
async function updateWorker(id, _worker) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  if (_worker.firstName) worker.firstName = _worker.firstName;
  if (_worker.lastName) worker.lastName = _worker.lastName;
  if (_worker.middleName) worker.middleName = _worker.middleName;
  if (_worker.email) worker.email = _worker.email;
  if (_worker.userName) worker.userName = _worker.userName;
  if (_worker.phoneNumber) worker.phoneNumber = _worker.phoneNumber;
  if (_worker.password) worker.password = _worker.password;
  if (_worker.pricePerDay) worker.pricePerDay = _worker.pricePerDay;
  return await worker.save();
}
//update the address

//add the skills
async function addSkills(id, _skills) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  for (let i = 0; i < _skills.skills.length; i++) {
    const index = worker.skills.findIndex((s) => s.id == _skills.skills[i]);
    if (index == -1) {
      let work = await Work.findById(_skills.skills[i]);
      work = {
        _id: work._id,
        work: work.work,
      };
      worker.skills.push(work);
    }
  }
  return await worker.save();
}
//remove the skills
async function removeSkills(id, _skills) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  for (let i = 0; i < _skills.skills.length; i++) {
    const index = worker.skills.findIndex((s) => s.id == _skills.skills[i]);
    if (index != -1) {
      worker.skills.splice(index, 1);
    }
  }
  return await worker.save();
}
async function updateAddressOfWorker(id, _address) {
  const worker = await Worker.findById(id);
  //console.log(worker);
  if (!worker) return;
  if (worker.address) {
    let address = await Address.findById(worker.address._id);
    address = await updateAddress(address._id, _address);
    worker.address = address;
  } else {
    let adrs = await addAddress(_address);
    worker.address = adrs;
  }
  return await worker.save();
}

//delete one worker with id
async function deleteWorker(id) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  if (worker.address) {
    await Address.deleteOne({ _id: worker.address._id });
  }

  return await Worker.deleteOne({ _id: id });
}
//add rating to the worker end point
async function addRating(id, _rating) {
  const worker = await Worker.findById(id);
  if (!worker) return;
  worker.rating = _rating.rating;
  return worker.save();
}
module.exports = {
  getWorker: getWorker,
  getWorkerByEmail: getWorkerByEmail,
  getWorkerByUserName: getWorkerByUserName,
  getWorkers: getWorkers,
  addWorker: addWorker,
  addSkills: addSkills,
  removeSkills: removeSkills,
  updateWorker: updateWorker,
  deleteWorker: deleteWorker,
  updateAddressOfWorker: updateAddressOfWorker,
  addRating: addRating,
  Worker,
};
