const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // Assuming User model is exported from a file named User.js
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth-middleware");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        sucess: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to database
    await newUser.save();

    // Return success response
    return res
      .status(201)
      .send({ sucess: true, message: "User Created successfully" });
  } catch (error) {
    // Return error response
    return res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id },
      "secret", // Replace this with your own secret key
      { expiresIn: "1h" }
    );

    // Return success response along with token
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      data: token,
    });
  } catch (error) {
    // Return error response
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("get-current-user", authMiddleware, async (req, res) => {
  console.log("Hey");
  try {
    const user = await User.findOne({ _id: req.body.userId });
    res.send({
      message: "User FEtched Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
