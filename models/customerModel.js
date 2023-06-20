const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
