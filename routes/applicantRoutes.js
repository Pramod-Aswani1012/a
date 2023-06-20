const express = require("express");
const Applicant = require("../models/applicantModels");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const Job = require("../models/jobModel");

//router object
const router = express.Router();

router.get("/allapplicant", async (req, res) => {
  try {
    const applicant = await Applicant.find({});
    res.status(200).send({
      message: "applicant fetched successfully",
      success: true,
      data: applicant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying applicant account",
      success: false,
      error,
    });
  }
});

router.get("/applicant-by-id", async (req, res) => {
  try {
    // console.log(req.body.employeId);
    const applicant = await Applicant.findOne({
      applicantId: req.body.applicantId,
    });
    // console.log(employee);
    if (!applicant) {
      return res
        .status(200)
        .send({ message: "applicant does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: applicant,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting applicant info", success: false, error });
  }
});

router.post("/create-applicant", async (req, res) => {
  try {
    const applicant = await Applicant.findOne({
      applicantId: req.body.applicantId,
    });
    if (applicant) {
      return res
        .status(200)
        .send({ message: "applicant already exist", success: true });
    }
    const newapplicant = new applicant(req.body);
    await applicant.save();
    res.status(200).send({
      message: "applicant created successfully",
      success: true,
      data: applicant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in creating new applicant",
      success: false,
      error,
    });
  }
});

router.delete("/Deleteapplicant-ID", async (req, res) => {
  try {
    // const empId = req.body.employeeId;
    const applicant = await applicant.findOneAndRemove({
      applicantId: req.body.applicantId,
    });
    if (applicant) {
      return res
        .status(200)
        .send({ message: "applicant has been deleted", success: true });
    } else {
      res.status(200).send({
        message: "Such applicant doesNot Exist",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error deleting applicant",
      success: false,
      error,
    });
  }
});

module.exports = router;
