const mongoose = require("mongoose");
const { workSchema } = require("../models/work");

//building a modal
const Work = mongoose.model("Work", workSchema);
//return all works
async function getWorks() {
  return await Work.find();
}
//return one work with given id
async function getWork(id) {
  const work = await Work.findById(id);
  if (!work) return;
  return work;
}
//add new work to database
async function addWork(_work) {
  const new_work = new Work({
    work: _work.work,
  });
  return await new_work.save();
}
//update a already exists
async function updateWork(id, _work) {
  const work = await Work.findById(id);
  if (!work) return;
  work.work = _work.work;
  return await work.save();
}
//delete a exists work
async function deleteWork(id) {
  return await Work.deleteOne({ _id: id });
}

module.exports = {
  getWorks: getWorks,
  getWork: getWork,
  updateWork: updateWork,
  deleteWork: deleteWork,
  addWork: addWork,
  Work: Work,
};
