const express = require("express");
const Router = express.Router();
const { validate, validateUpdate } = require("../models/customer");
const { validatAdd } = require("../models/address");
const {
  getCustomer,
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  updateAddressOfCustomer,
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
//update customer
Router.put("/:id", async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await updateCustomer(req.params.id, req.body);
  if (!customer)
    return res.status(400).send(`Customer not found with id: ${req.params.id}`);
  return res.send(customer);
});
Router.put("/update/address/:id", async (req, res) => {
  const { error } = validatAdd(req.body);
  if (error) return res.status(400).send();
  const customer = await updateAddressOfCustomer(req.params.id, req.body);
  if (!customer)
    return res.status(400).send(`No customer found with id ${req.params.id}`);
  return res.send(customer);
});

module.exports = Router;
