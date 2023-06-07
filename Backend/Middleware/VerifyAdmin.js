const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyAdmin = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  jwt.verify(token, process.env.ADMINKEY, (err, data) => {
    if (!err) {
      next();
    } else {
      res.status(400).send("Invalid user access");
    }
  });
};
module.exports = VerifyAdmin;
