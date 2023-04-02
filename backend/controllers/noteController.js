const NoteModel = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find({
    user: req.user._id,
  });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  } else {
    const note = new NoteModel({
      title,
      content,
      category,
      user: req.user._id,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

// update note
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await NoteModel.findById(req.params.id);
  //   console.log(note);
  //   console.log(req.user._id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// delete note
const deleteNote = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (note) {
    // earlier it was note.remove()
    // but now that is deprecated and we use note.deleteOne()
    await note.deleteOne();

    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
