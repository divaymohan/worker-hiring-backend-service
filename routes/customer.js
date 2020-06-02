const express = require("express");
const Router = express.Router();
const { validate, validateUpdate } = require("../models/customer");
const {
  getCustomer,
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../database/customers");

//for all the customers
Router.get("/", async (req, res) => {
  const customers = await getCustomers();
  return res.send(customers);
});
//for one customer
Router.get("/:id", async (req, res) => {
  const customer = await getCustomer(req.params.id);
  if (!customer)
    return res.status(400).send(`No customer found with id ${req.params.id}`);
  return res.send(customer);
});
//add new customer
Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await addCustomer(req.body);
  return res.send(customer);
});

module.exports = Router;
