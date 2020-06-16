const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validate, customerSchema } = require("../models/customer");
const { addAddress, updateAddress } = require("./address");
const { Address } = require("./address");
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
  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  if (_customer.address) {
    const address = await addAddress(_customer.address);
    customer.address = address;
  }
  return await customer.save();
}

async function updateCustomer(id, _customer) {
  const customer = await Customer.findById(id);
  if (!customer) return;
  if (_customer.firstName) customer.firstName = _customer.firstName;
  if (_customer.lastName) customer.lastName = _customer.lastName;
  if (_customer.middleName) customer.middleName = _customer.middleName;
  if (_customer.userName) customer.userName = _customer.userName;
  if (_customer.email) customer.email = _customer.email;
  if (_customer.phoneNumber) customer.phoneNumber = _customer.phoneNumber;
  if (_customer.password) customer.password = _customer.password;
  if (_customer.isSpecial) customer.isSpecial = _customer.isSpecial;
  return await customer.save();
}
async function updateAddressOfCustomer(id, _address) {
  const customer = await Customer.findById(id);
  //console.log(worker);
  if (!customer) return;
  if (customer.address) {
    let address = await Address.findById(customer.address._id);
    address = await updateAddress(address._id, _address);
    customer.address = address;
  } else {
    let adrs = await addAddress(_address);
    customer.address = adrs;
  }
  return await customer.save();
}

async function deleteCustomer(id) {
  const customer = await Customer.findById(id);
  if (!customer) return;
  if (customer.address) await Address.deleteOne({ _id: customer.address._id });
  return await Customer.deleteOne({ _id: id });
}

module.exports = {
  getCustomer,
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  updateAddressOfCustomer,
  Customer,
};
