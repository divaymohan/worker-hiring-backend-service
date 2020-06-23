const {
  getWorker,
  getWorkers,
  getWorkerByEmail,
  getWorkerByUserName,
  addWorker,
  addSkills,
  removeSkills,
  updateWorker,
  deleteWorker,
  updateAddressOfWorker,
  addRating,
} = require("../database/worker");
const { validate, validateSkills } = require("../models/worker");
const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");

//get all workers
Router.get("/", async (req, res) => {
  return res.send(await getWorkers());
});
//get one worker
Router.get("/:id", async (req, res) => {
  const worker = await getWorker(req.params.id);
  if (!worker)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(worker);
});
//get one worker by email
Router.get("/byEmail/:email", async (req, res) => {
  const worker = await getWorkerByEmail(req.params.email);
  if (!worker)
    return res
      .status(400)
      .send(`No worker found with email ${req.params.email}`);
  return res.send(worker);
});

//get one worker by its usename
Router.get("/byUname/:uname", async (req, res) => {
  const worker = await getWorkerByUserName(req.params.uname);
  if (!worker)
    return res
      .status(400)
      .send(`No worker found with uname ${req.params.uname}`);
  return res.send(worker);
});
//add new worker
Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let worker = await getWorkerByUserName(req.body.userName);
  if (worker) {
    return res
      .status(400)
      .send("User with this Username already registered..!!");
  }
  worker = await getWorkerByEmail(req.body.email);
  if (worker) {
    return res
      .status(400)
      .send("User with this email id already registered..!!");
  }
  const result = await addWorker(req.body);
  const token = result.generatesToken();
  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(result);
});
//update worker address
Router.put("/update/address/:id", async (req, res) => {
  const worker = await updateAddressOfWorker(req.params.id, req.body);
  if (!worker)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(worker);
});
//update worker
Router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await updateWorker(req.params.id, req.body);
  if (!result)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(result);
});
//add skills to a existing worker
Router.put("/add/skill/:id", async (req, res) => {
  const { error } = validateSkills(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await addSkills(req.params.id, req.body);
  if (!result)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(result);
});
//remove skills
Router.delete("/remove/skill/:id", async (req, res) => {
  const { error } = validateSkills(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await removeSkills(req.params.id, req.body);
  if (!result)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(result);
});
//remove worker
Router.delete("/:id", async (req, res) => {
  const result = await deleteWorker(req.params.id);
  if (!result || result.n == 0)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(result);
});
//adding rating
Router.put("/add/rating/:id", async (req, res) => {
  const { error } = validateRating(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await addRating(req.params.id, req.body);
  if (!result)
    return res.status(400).send(`No worker found with id ${req.params.id}`);
  return res.send(result);
});

module.exports = Router;
