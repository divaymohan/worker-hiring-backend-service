const mongoose = require("mongoose");
const { validate, customerSchema } = require("../models/customer");
const { addAddress } = require("./address");
//model
const Customer = mongoose.model("Customer", customerSchema);

//get all customers
async function getCustomers() {
  return await Customer.find();
}
//get one customer by id
async function getCustomer(id) {
  return await Customer.findById(id);
}
//add new address
async function addCustomer(_customer) {
  const customer = new Customer({
    firstName: _customer.firstName,
    lastName: _customer.lastName,
    middleName: _customer.middleName,
    userName: _customer.userName,
    email: _customer.email,
    phoneNumber: _customer.phoneNumber,
    password: _customer.password,
    isSpecial: _customer.isSpecial,
  });
  if (_customer.address) {
    const address = await addAddress(_customer.address);
    customer.address = address;
  }
  return await customer.save();
}

async function updateCustomer(id, _customer) {}

async function deleteCustomer(id) {}

module.exports = {
  getCustomer,
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
