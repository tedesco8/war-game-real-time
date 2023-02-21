const { createContainer, asClass, asValue, asFunction } = require("awilix");

const config = require("../config");

const Transport = require("../config/email");

const app = require(".");

const Routes = require("../routes");

// routes
const { AuthRoutes, EncryptionRoutes, UserRoutes, GameRoutes } = require("../routes/index.routes");

// controllers
const {
  AuthController,
  EncryptionController,
  UserController,
  GameController,
} = require("../controllers");

// services
const {
  AuthService,
  TokenService,
  EmailService,
  EncryptionService,
  UserService,
  GameService,
} = require("../services");

// repositories
const { UserRepository, GameRepository } = require("../repositories");

// models
const { UserModel, GameModel } = require("../models");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    transport: asValue(Transport),
  })
  .register({
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    EncryptionRoutes: asFunction(EncryptionRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    GameRoutes: asFunction(GameRoutes).singleton(),
  })
  .register({
    GameController: asClass(
      GameController.bind(GameController)
    ).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    EncryptionController: asClass(
      EncryptionController.bind(EncryptionController)
    ).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
  })
  .register({
    AuthService: asClass(AuthService).singleton(),
    TokenService: asValue(TokenService),
    EmailService: asClass(EmailService).singleton(),
    EncryptionService: asClass(EncryptionService).singleton(),
    UserService: asClass(UserService).singleton(),
    GameService: asClass(GameService).singleton(),
  })
  .register({
    GameRepository: asClass(GameRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
  })
  .register({
    GameModel: asValue(GameModel),
    UserModel: asValue(UserModel),
  });

module.exports = container;
