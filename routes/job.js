const express = require("express");
const Router = express.Router();
const {
  validate,
  validateHistory,
  validateRating,
  validateCancle,
  validateAccept,
} = require("../models/job");
const {
  getJob,
  addJob,
  getWorkerHistory,
  getCustomerHistory,
  updateRating,
  updateCancleStatus,
  updateAcceptState,
} = require("../database/job");
Router.get("/:id", async (req, res) => {
  const job = await getJob(req.params.id);
  if (!job) return res.status(400).send("Job Not Found..");
  return res.send(job);
});
Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await addJob(req.body);
  if (!result) return res.status(400).send("server Error");
  return res.send(result);
});
Router.post("/history/worker", async (req, res) => {
  const { error } = validateHistory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await getWorkerHistory(req.body._id);
  if (!result) return res.status(400).send("server Error");
  return res.send(result);
});
Router.post("/history/customer", async (req, res) => {
  const { error } = validateHistory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await getCustomerHistory(req.body._id);
  if (!result) return res.status(400).send("server Error");
  return res.send(result);
});
Router.put("/job/rating/:id", async (req, res) => {
  const { error } = validateRating(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await updateRating(req.params.id, req.body);
  if (!result) return res.status(400).send("job not found");
  return res.send(result);
});
Router.put("/job/cancle/:id", async (req, res) => {
  const { error } = validateCancle(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await updateCancleStatus(req.params.id, req.body);
  if (!result) return res.status(400).send("job not found");
  return res.send(result);
});
Router.put("/job/accept/:id", async (req, res) => {
  const { error } = validateAccept(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await updateAcceptState(req.params.id, req.body);
  if (!result) return res.status(400).send("job not found");
  return res.send(result);
});

module.exports = Router;
