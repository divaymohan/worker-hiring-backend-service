const { validate } = require("../models/work");
const {
  addWork,
  getWork,
  getWorks,
  deleteWork,
  updateWork,
} = require("../database/work");
const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res) => {
  const works = await getWorks();
  return res.send(works);
});
Router.get("/:id", async (req, res) => {
  const work = await getWork(req.params.id);
  if (!work)
    return res.status(400).send(`No work found with id ${req.params.id}`);
  return res.send(work);
});
Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await addWork(req.body);
  return res.send(result);
});
Router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await updateWork(req.params.id, req.body);
  if (!result)
    return res.status(400).send(`No work is founded with id ${req.params.id}`);
  return res.send(result);
});
Router.delete("/:id", async (req, res) => {
  const result = await deleteWork(req.params.id);
  if (result.n == 0)
    return res.status(400).send(`No work found with id ${req.params.id}`);
  return res.send(result);
});

module.exports = Router;
