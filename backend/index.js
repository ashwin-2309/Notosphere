// Importing necessary packages
const express = require("express");
const { connection } = require("mongoose"); // destructuring 'connection' from mongoose
const cors = require("cors");
const userRouter = require("./routes/user.route"); // importing router logic for /user endpoint
const noteRouter = require("./routes/note.route"); // importing router logic for /note endpoint

// Initializing the express app and assigning it to variable `app`
const app = express();
const port = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Using the imported routers to handle requests to the respective endpoints
// Giving different names to the imported routers to avoid confusion
app.use("/user", userRouter);
app.use("/note", noteRouter);

// Setting up a default endpoint to say "Hello World!" when user visits home '/'
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Starting to listen on the specified port and connecting to the MongoDB atlas cluster
app.listen(port, async () => {
  try {
    connection; // initiating mongoose connection
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${port}`);
});
