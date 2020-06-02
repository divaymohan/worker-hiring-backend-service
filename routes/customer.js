const express = require("express");
const Router = express.Router();
const {
  getCustomer,
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../database/customers");

module.exports = Router;
