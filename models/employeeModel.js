const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      // default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;

//
