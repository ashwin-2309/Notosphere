const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
connectDB();
app.use(express.json()); // to parse json data in the body

const port = process.env.PORT || 5000;
app.get("/api", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
