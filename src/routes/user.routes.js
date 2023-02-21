const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { CACHE_TIME } = require("../helpers");

module.exports = function({ UserController }) {
  const router = Router();

  router.get("", [ParseIntMiddleware], AuthMiddleware, UserController.getAll);
  router.get("/:userId", AuthMiddleware, UserController.get);
  router.get("/getByUsername/:userName", AuthMiddleware, UserController.getByUsername);
  router.post("", UserController.create);
  router.patch("/:userId", AuthMiddleware, UserController.update);
  router.delete("/:userId", AuthMiddleware, UserController.delete);

  return router;
};
