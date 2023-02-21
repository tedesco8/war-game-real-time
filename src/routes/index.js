const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const compression = require("compression");

require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({ AuthRoutes, EncryptionRoutes, UserRoutes, GameRoutes }) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(cors("*")).use(helmet()).use(compression());

  apiRoutes.use("/auth", express.json(), AuthRoutes);
  apiRoutes.use("/encryption", express.json(), EncryptionRoutes);
  apiRoutes.use("/user", express.json(), UserRoutes);
  apiRoutes.use("/game", express.json(), GameRoutes);

  router.use("/v2/api", apiRoutes);
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);
  router.use(morgan("dev"));
  
  router.use(express.urlencoded({ extended: true }));
  router.use(express.static(path.join(__dirname, "public")));
  router.use(express.static("upload/images"));

  return router;
};
