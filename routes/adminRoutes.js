const express = require("express");
const Applicant = require("../models/applicantModels");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const Job = require("../models/jobModel");

//router object
const router = express.Router();

//routes

router.get("/allEmploye", async (req, res) => {
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
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
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
router.get("/allApplicant", async (req, res) => {
  try {
    const applicant = await Applicant.find({});
    res.status(200).send({
      message: "applicants fetched successfully",
      success: true,
      data: applicant,
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
router.get("/allCustomer", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send({
      message: "customers fetched successfully",
      success: true,
      data: customers,
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
router.post("/changeEmployeeStatus", async (req, res) => {
  try {
    const { EmployeeId, status } = req.body;
    const employee = await Employee.findByIdAndUpdate(EmployeeId, {
      status,
    });

    const user = await User.findOne({ _id: employee.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-employee-request-changed",
      message: `Your employee account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isEmploye = status === "approved" ? true : false;
    await user.save();

    res.status(200).send({
      message: "Employee status updated successfully",
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

router.post("/addJobs", async (req, res) => {
  try {
    console.log(req.body);
    const jobexist = await Job.findOne({ jobTitle: req.body.data.jobTitle });
    if (jobexist) {
      return res
        .status(200)
        .send({ message: "Job already exists", success: false });
    }

    const newjob = new Job(req.body.data);
    await newjob.save();
    console.log(newjob);
    res
      .status(200)
      .send({ message: "Job created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating job", success: false, error });
  }
});

router.get("/searchjobs", async (req, res) => {
  try {
    const job = await Job.findOne({ jobTitle: req.body.jobTitle });
    res.status(200).send({
      success: true,
      message: "job info fetched successfully",
      data: job,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in finding jobs", success: false, error });
  }
});

router.get("/alljobs", async (req, res) => {
  try {
    const job = await Job.find({});
    res.status(200).send({
      success: true,
      message: "Alljob info fetched successfully",
      data: job,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in finding jobs", success: false, error });
  }
});

module.exports = router;
