// Import the mongoose library for Node.js to connect to MongoDB database
const mongoose = require("mongoose");

// Declare the uri of the mongodb atlas cluster where the data is stored

const mongoUri =
  "mongodb+srv://ashaks2309:saymyname@cluster0.czuwknz.mongodb.net/test";

// Connect to the mongodb database and specify properties of this connection
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to database")) // Log a message on successful connection
  .catch((err) => console.log("Error connecting to database", err)); // Catch any errors in the connection

// Export the established connection object model by calling the function mongoose.connection from another file.
