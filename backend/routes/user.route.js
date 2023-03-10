const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// create a router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("It is working");
});

// create a route for register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hash = await bcrypt.hash(password, 10);
    let user = new UserModel({ name, email, password: hash });
    await user.save();
    res.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// create a route for login
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
          res.json({
            message: "Auth successful",
            token: token,
            status: 1,
          });
        } else {
          res.json({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.json({
        message: "User not found",
        status: 0,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
