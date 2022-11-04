const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AdminPanel = require("../../models/AdminPanel.model");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["Bearer"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.id;
    console.log("user", req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;