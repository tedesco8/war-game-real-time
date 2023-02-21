const { Router } = require("express");
const multipart = require("connect-multiparty");

const {
  ParseIntMiddleware,
  AuthMiddleware,
  RoleMiddleware: { verifyAdministrador, verifyAgencia },
} = require("../middlewares");

const md_upload = multipart({ uploadDir: "../upload/images" });
const router = Router();

module.exports = function ({ ClientController }) {
  router.get(
    "",
    [ParseIntMiddleware],
    AuthMiddleware,
    ClientController.getAll
  );
  router.get("/:clientId", ClientController.get);
  router.post("", ClientController.create);
  router.put(
    "/:clientId",
    AuthMiddleware,
    verifyAgencia,
    ClientController.update
  );
  router.delete(
    "/:clientId",
    AuthMiddleware,
    verifyAdministrador,
    ClientController.delete
  );

  // router.post("/login", ClientController.login);
  router.post("/registration", ClientController.registration);
  router.post("/upload-image/:id", md_upload, ClientController.upload);

  router.get("/exist", ClientController.exist);

  router.patch(
    "/activate",
    AuthMiddleware,
    verifyAdministrador,
    ClientController.activate
  );
  router.patch(
    "/deactivate",
    AuthMiddleware,
    verifyAdministrador,
    ClientController.deactivate
  );

  return router;
};
