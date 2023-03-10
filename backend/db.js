const mongoose = require("mongoose");
const mongoUri =
  "mongodb+srv://ash2309:saymyname@ashdev.t5njj.mongodb.net/test";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database", err));

module.exports = mongoose.connection;
