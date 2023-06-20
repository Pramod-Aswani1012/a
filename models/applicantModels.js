const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  applicantId: {
    type: String,
    required: [true, "name is required"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  resumelink: {
    type: String,
    required: [true, "name is required"],
  },

  //   project: {
  //     type: String,
  //     required: [true, "name is required"],
  //   },

  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  jobStatus: {
    type: String,
    enum: ["applied", "interviewed", "hired", "rejected"],
    required: true,
  },
});

const applicant = mongoose.model("applicant", Schema);

module.exports = applicant;
