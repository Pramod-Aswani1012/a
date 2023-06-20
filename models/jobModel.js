const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
