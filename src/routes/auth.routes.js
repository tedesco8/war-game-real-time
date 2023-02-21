const { Router } = require("express");

module.exports = function({ AuthController }) {
  const router = Router();

  router.post("/signin", AuthController.signIn);
  router.post("/internal", AuthController.internalSignIn);
  return router;
};
