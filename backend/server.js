const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
connectDB();
app.use(express.json()); // to parse json data in the body

const port = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.get("/api/secret", (req, res) => {
  res.send({ express: "The password is potato" });
});
app.get("/api/notes", (req, res) => {
  res.send(notes);
});
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
