const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connnectDB = require("./config/db");
const path = require("path");

// dotenv config
dotenv.config();

//mongodbconnection
connnectDB();

// Rest Object
const app = express();

//Middlewares
app.use(express.json());

//Cors
app.use(cors());

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/applicant", require("./routes/applicantRoutes"));
app.use("/api/v1/employe", require("./routes/employeRoutes.js"));
app.use("/api/v1/customer", require("./routes/customerRoutes.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/carrer", require("./routes/carrerRoutes"));

// port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server is running at port number ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
  );
});






