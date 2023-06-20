const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware.js");

const moment = require("moment");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // isMatch = req.body.password === user.password;
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      // token = await user.generateAuthToken()
      // await user.save()
      console.log(token)
      user.tokens= token;
       await user.save()
     
      
      
      res
        .status(200)
        .cookie('jwtoken1111', token,{
          maxAge: 300000,
          // secure: false,
          httpOnly: true,
          sameSite: "none",
        })
        .send({ message: "Login successful", success: true, data: token });
       
        
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

// isme abhi authMiddleware lgana hai
router.post("/get-user-info-by-id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

// isme bhi middleware lgana hai
router.post("/apply-employee-account", async (req, res) => {
  try {
    const newEmployee = new Employee({ ...req.body, status: "pending" });
    await newEmployee.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-employee-request",
      message: `${newEmployee.firstName} ${newEmployee.lastName} has applied for a employee account`,
      data: {
        employeeId: newEmployee._id,
        name: newEmployee.firstName + " " + newEmployee.lastName,
      },
      onClickPath: "/admin/employeelist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Employee account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error applying employee account ${error}`,
      success: false,
      error,
    });
  }
});
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying employee account",
        success: false,
        error,
      });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
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





// start
router.get("/Profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

   
    res.status(200).send({
      success: true,
      message: "the user is",
      data: User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "user dosenot exist",
      success: false,
      error,
    });
  }
});

// end

router.get("/get-all-approved-employee", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.find({ status: "approved" });
    res.status(200).send({
      message: "employees fetched successfully",
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

module.exports = router;
