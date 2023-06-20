const express = require("express");
const Applicant = require("../models/applicantModels");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const Job = require("../models/jobModel");

//router object
const router = express.Router();

router.get("/allemployee", async (req, res) => {
  try {
    const employee = await Employee.find({});
    res.status(200).send({
      message: "Employee fetched successfully",
      success: true,
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying employee account",
      success: false,
      error,
    });
  }
});

router.get("/employee-by-id", async (req, res) => {
  try {
    // console.log(req.body.employeId);
    const employee = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    // console.log(employee);
    if (!employee) {
      return res
        .status(200)
        .send({ message: "Employee does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: employee,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting employee info", success: false, error });
  }
});

router.post("/create-employee", async (req, res) => {
  try {
    const empId = req.body.employeeId;
    console.log(empId);
    const employee = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (employee) {
      return res
        .status(200)
        .send({ message: "Employee already exist", success: false });
    }
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(200).send({
      message: "Employee created successfully",
      success: true,
      data: newEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in creating new employee",
      success: false,
      error,
    });
  }
});

router.delete("/DeleteEmployee-ID", async (req, res) => {
  try {
    const empId = req.body.employeeId;
    const employee = await Employee.findOneAndRemove({
      employeeId: req.body.employeeId,
    });
    if (employee) {
      return res
        .status(200)
        .send({ message: "Employee has been deleted", success: true });
    } else {
      res.status(200).send({
        message: "Such Employee doesNot Exist",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in creating new employee",
      success: false,
      error,
    });
  }
});

module.exports = router;
