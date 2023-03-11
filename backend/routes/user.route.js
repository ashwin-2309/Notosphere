// explain the following code
// import necessary packages
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import User Model
const UserModel = require("../models/UserModel");

// create a router
const router = express.Router();

// home route to check server status
router.get("/", (req, res) => {
  res.send("It is working");
});

// create route for user registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Verify required fields are not missing
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password and save the user to the database
    const hash = await bcrypt.hash(password, 10);
    let user = new UserModel({ name, email, password: hash });
    await user.save();

    // Send success response
    res.json({ message: "User created" });
  } catch (err) {
    console.error(err);

    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
});

// create a route for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth failed", status: 0 });
        }
        if (result) {
          let token = jwt.sign({ userId: user._id }, "secretkey");
          console.log(token);

          // Send success response with token
          res.json({
            message: "Auth successful",
            token: token,
            status: 1,
          });
        } else {
          // Send incorrect password response
          res.json({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      // Send user not found response
      res.json({
        message: "User not found",
        status: 0,
      });
    }
  } catch (err) {
    console.error(err);

    // Send error response
    res.status(500).json({ message: "Internal server error" });
  }
});

// export the router
module.exports = router;
