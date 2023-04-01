const jwt = require("jsonwebtoken");

// user id from the database is passed in
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;
