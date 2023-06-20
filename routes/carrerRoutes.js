const express = require("express");
const Applicant = require("../models/applicantModels");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const Job = require("../models/jobModel");

//router object
const router = express.Router();

router.get("/Searchjobs", async (req, res) => {
  try {
    // const job = 1;
    if (!req.query) {
      res.status(500).send({
        success: fasle,
        message: "Please try some keyWord",
      });
    }
    const job = await Job.findOne({ jobTitle: req.query.jobTitle });
    console.log(req.query);
    if (job) {
      res.status(200).send({
        success: true,
        message: "job info fetched successfully",
        data: job,
      });
    } else {
      res.status(500).send({
        success: fasle,
        message: "Job Not Found",
      });
    }
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
