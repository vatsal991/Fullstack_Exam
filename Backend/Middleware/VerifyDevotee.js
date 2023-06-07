const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyDevotee = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  jwt.verify(token, process.env.KEY, (err, data) => {
    if (!err) {
      next();
    } else {
      res.status(400).send("Invalid user access");
    }
  });
};
module.exports = VerifyDevotee;
