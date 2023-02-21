const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = function(user) {
  return sign({ user }, JWT_SECRET, { expiresIn: "8h" });
};

module.exports = {
  generateToken
};
