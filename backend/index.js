const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const noteRouter = require("./routes/note.route");
const connectToDatabase = require("./db");

const app = express();
const port = 4000;

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your frontend
    credentials: true,
  })
);

app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectToDatabase()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error.message);
  });
