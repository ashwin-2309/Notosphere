const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
connectDB();
app.use(express.json()); // to parse json data in the body

const port = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
// ---------------------------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send({ express: "Hello From Express" });
  });
}

// ---------------------------------------------------
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
