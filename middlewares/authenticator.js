// Import the jwt module to verify token
const jwt = require("jsonwebtoken");

/*
 * Authenticator middleware function that takes three parameters req, res and next
 * If the token is valid, then the function call the next() callback function to move on to the next middleware function, if not, then send an appropriate error response to the client.
 */
function authenticator(req, res, next) {
  // Get the user's token from the headers of the request
  const token = req.headers.authorization;

  // Verify the retrieved token using secretkey in case it matches the stored one
  jwt.verify(token, "secretkey", (err, decode) => {
    if (err) {
      // Error case when the token is not valid or expired
      res.send({
        message: "Token is not valid, please login",
        status: 2,
      });
    }
    if (decode) {
      // Token is valid case
      // Adding the decoded User's id to the requester body to be used in further other requests
      req.body.user = decode.userId;

      // Calling next to proceed to the next middleware function or main request handler
      next();
    } else {
      // Any other errors
      res.send({
        message: "Token is not valid, please login",
        status: 2,
      });
    }
  });
}

// Exporting authenticator function to be used and accessed by other modules using require()
module.exports = authenticator;
