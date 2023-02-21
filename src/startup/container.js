const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");

const Transport = require("../config/email");

const app = require(".");

const Routes = require("../routes");

// routes
const { AuthRoutes, EncryptionRoutes, UserRoutes, ClientRoutes } = require("../routes/index.routes");

// controllers
const {
  AuthController,
  EncryptionController,
  UserController,
  ClientController,
} = require("../controllers");

// services
const {
  AuthService,
  TokenService,
  EmailService,
  EncryptionService,
  UserService,
  ClientService,
} = require("../services");

// repositories
const { UserRepository, ClientRepository } = require("../repositories");

// models
const { UserModel, ClientModel } = require("../models");

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
    ClientRoutes: asFunction(ClientRoutes).singleton(),
  })
  .register({
    ClientController: asClass(
      ClientController.bind(ClientController)
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
    ClientService: asClass(ClientService).singleton(),
  })
  .register({
    ClientRepository: asClass(ClientRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
  })
  .register({
    ClientModel: asValue(ClientModel),
    UserModel: asValue(UserModel),
  });

module.exports = container;
