module.exports = {
  NotFoundMiddleware: require("./not-found.middleware"),
  ErrorMiddleware: require("./error.middleware"),
  AuthMiddleware: require("./auth.middleware"),
  RoleMiddleware: require("./role.middleware"),
  ParseIntMiddleware: require("./parse-int.middleware"),
  CacheMiddleware: require("./cache.middleware"),
  BodyParserMiddleware: require("./parser.middleware"),
};
