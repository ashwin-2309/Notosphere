// Model for notes so title and body

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      // This is the user who created the note
      // referencing the user model
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("Note", noteSchema);
module.exports = NoteModel;
