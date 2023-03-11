const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://ashaks2309:saymyname@cluster0.czuwknz.mongodb.net/test";

// Return the connection promise
module.exports = () => {
  return mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
