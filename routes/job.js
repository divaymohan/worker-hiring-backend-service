const express = require("express");
const Router = express.Router();
const { validate, validateHistory } = require("../models/job");
const {
  getJob,
  addJob,
  getWorkerHistory,
  getCustomerHistory,
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

module.exports = Router;
