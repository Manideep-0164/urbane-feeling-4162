const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  // User Authentication
  const token = req.headers.authorization;
  const key = process.env.JWT_KEY_U;
  if (!token) return res.json({ message: "Please provide token!" });
  try {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.send({ error: `Please Login` });
        console.log(err.message);
      } else {
        req.body.user = decoded.userID;
        next();
      }
    });
  } catch (err) {
    res.send({ error: err.message });
  }
};

const authenticateAdmin = (req, res, next) => {
  // Admin Authentication
  const token = req.headers.authorization;
  const key = process.env.JWT_KEY_A;
  try {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        if (err.message == "invalid signature")
          res.send({ error: `Authorization Invoked,You are Not an Admin` });
        else res.send({ error: `Please Login` });
      } else {
        next();
      }
    });
  } catch (err) {
    console.log("fail");
    res.send({ error: err });
  }
};

module.exports = {
  authenticate,
  authenticateAdmin,
};
