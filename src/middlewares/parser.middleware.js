const bodyParser = require("body-parser");

module.exports = function (req, res, next) {
  bodyParser.json({ limit: "15mb" });

  // create application/x-www-form-urlencoded parser
  bodyParser.urlencoded({
    limit: "15mb",
    extended: false,
  });

  next();
};