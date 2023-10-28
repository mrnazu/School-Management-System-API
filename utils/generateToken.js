const jwt = require("jsonwebtoken");

const generateToken = id => {
  return jwt.sign({ id }, "anykey", { expiresIn: "5d" });
};

module.exports = generateToken;
