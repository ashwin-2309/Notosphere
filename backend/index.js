const express = require("express");
const { connection } = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route");
// i have exported the router from user.route.js and router will be named userRouter in this file

// require("dotenv").config();
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes for userRouter
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  try {
    connection;
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
