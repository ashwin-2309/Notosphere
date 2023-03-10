const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const NoteModel = require("../models/NoteModel");

const authenticator = require("../middlewares/authenticator");

router.use(authenticator);
// endpoint to get all notes of a user
// we don't need user id in the request body
// as we can get it from the token as the token is signed with the user id

router.get("/", async (req, res) => {
  try {
    // get token from header and verify it
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "secretkey");
    // get all notes for the user
    const data = await NoteModel.find({ user: decoded.userId });
    res.send({
      message: "all the notes",
      status: 1,
      data: data,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

// endpoint to create a note
router.post("/create", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.send({
      message: "Note created successfully",
      status: 1,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

// endpoint to update a note
router.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated successfully",
      status: 1,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

// endpoint to delete a note
router.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note deleted successfully",
      status: 1,
    });
  } catch (err) {
    res.send({
      message: err.message,
      status: 0,
    });
  }
});

module.exports = router;
