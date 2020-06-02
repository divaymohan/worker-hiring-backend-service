const express = require("express");
const _work = require("../routes/work");
const _address = require("../routes/address");
const _worker = require("../routes/worker");
const _customer = require("../routes/customer");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/hiring/work", _work);
  app.use("/api/hiring/address", _address);
  app.use("/api/hiring/workers", _worker);
  app.use("/api/hiring/customers", _customer);
};
