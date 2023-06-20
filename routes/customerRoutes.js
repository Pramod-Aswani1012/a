const express = require("express");
const Applicant = require("../models/applicantModels");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const Job = require("../models/jobModel");

//router object
const router = express.Router();

router.get("/allcustomer", async (req, res) => {
  try {
    const customer = await Customer.find({});
    res.status(200).send({
      message: "Customer fetched successfully",
      success: true,
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying customer account",
      success: false,
      error,
    });
  }
});

router.get("/customer-by-id", async (req, res) => {
  try {
    // console.log(req.body.employeId);
    const customer = await Customer.findOne({
      customerID: req.body.customerID,
    });
    // console.log(employee);
    if (!customer) {
      return res
        .status(200)
        .send({ message: "customer does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: customer,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting customer info", success: false, error });
  }
});

router.post("/create-customer", async (req, res) => {
  try {
    // const empId = req.body.employeeId;
    // console.log(empId);
    const customer = await Customer.findOne({
      customerID: req.body.customerID,
    });
    if (customer) {
      return res
        .status(200)
        .send({ message: "customer already exist", success: true });
    }
    const newCustomer = new Customer(req.body);
    await Customer.save();
    res.status(200).send({
      message: "Customer created successfully",
      success: true,
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in creating new customer",
      success: false,
      error,
    });
  }
});

router.delete("/DeleteCustomer-ID", async (req, res) => {
  try {
    // const empId = req.body.employeeId;
    const customer = await Customer.findOneAndRemove({
      customerID: req.body.customerID,
    });
    if (customer) {
      return res
        .status(200)
        .send({ message: "Customer has been deleted", success: true });
    } else {
      res.status(200).send({
        message: "Such Customer doesNot Exist",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in delete customer",
      success: false,
      error,
    });
  }
});

module.exports = router;
