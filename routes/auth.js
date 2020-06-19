const express = require("express");
const bcrypt = require("bcrypt");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const { validate } = require("../auth/authModel");
const { getWorkerByUserName } = require("../database/worker");
const { getCustomerByName } = require("../database/customers");

Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.body.roll === "worker") {
    const worker = await getWorkerByUserName(req.body.userName);
    if (!worker) return res.status(400).send("Username or Password is wrong");
    const result = await bcrypt.compare(req.body.password, worker.password);
    if (!result) return res.status(400).send("Username or Password is wrong");
    const token = worker.generatesToken();

    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  }
  if (req.body.roll === "customer") {
    const customer = await getCustomerByName(req.body.userName);
    if (!customer) return res.status(400).send("Username or Password is wrong");
    const result = await bcrypt.compare(req.body.password, customer.password);
    if (!result) return res.status(400).send("Username or Password is wrong");
    const token = customer.generatesToken();

    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(customer);
  }
  return res.status(400).send(`Role cant be ${req.body.roll}`);
});

module.exports = Router;
