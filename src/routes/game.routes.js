const { Router } = require("express");
// const multipart = require("connect-multiparty");

const {
  ParseIntMiddleware,
  AuthMiddleware,
  RoleMiddleware: { verifyAdministrador, verifyAgencia },
} = require("../middlewares");

// const md_upload = multipart({ uploadDir: "../upload/images" });
const router = Router();

module.exports = function ({ GameController }) {
  router.get("", [ParseIntMiddleware], AuthMiddleware, GameController.getAll);
  router.get("/:clientId", GameController.get);
  router.post("", GameController.create);
  router.put("/:clientId", GameController.update);
  router.delete("/:clientId", GameController.delete);

  return router;
};
