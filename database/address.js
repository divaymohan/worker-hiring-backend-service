const mongoose = require("mongoose");
const { addressSchema } = require("../models/address");

//model
const Address = mongoose.model("Address", addressSchema);

//get all address
async function getAddresses() {
  return await Address.find();
}
//get one by id
async function getAddress(id) {
  const address = await Address.findById(id);
  if (!address) return;
  return address;
}
//add new address
async function addAddress(_address) {
  let address = new Address({
    houseNumber: _address.houseNumber,
    city: _address.city,
    country: _address.country,
    pin: _address.pin,
    street: _address.street,
    area: _address.area,
    landmark: _address.landmark,
  });
  return await address.save();
}
//update address
async function updateAddress(id, _address) {
  let address = await Address.findById(id);
  if (!address) return;
  if (_address.houseNumber) address.houseNumber = _address.houseNumber;
  if (_address.city) address.city = _address.city;
  if (_address.country) address.country = _address.country;
  if (_address.pin) address.pin = _address.pin;
  if (_address.street) address.street = _address.street;
  if (_address.area) address.street = _address.street;
  if (_address.landmark) address.landmark = _address.landmark;

  return await address.save();
}
//delete one
async function deleteAddress(id) {
  return await Address.deleteOne({ _id: id });
}

module.exports = {
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  addAddress,
  Address,
};
