const tokenService = require("../services/token.service");
module.exports = {
  verifyAdministrador: async (req, res, next) => {
    const response = await tokenService.decode(req.headers.authorization);
    if (response.tipo == "Administrador") {
      next();
    }
    return res.status(403).send({
      message: "No autorizado",
    });
  },
  verifyVendedor: async (req, res, next) => {
    const response = await tokenService.decode(req.headers.token);
    if (response.tipo == "Administrador" || response.tipo == "Vendedor") {
      next();
    }
    return res.status(403).send({
      message: "No autorizado",
    });
  },
  verifyAgencia: async (req, res, next) => {
    const response = await tokenService.decode(req.headers.token);
    switch (response.tipo) {
      case "Administrador":
        next();
        break;
      case "Vendedor":
        next();
        break;
      case "Agencia":
        next();
        break;
      default:
        res.status(403).send({
          message: "No autorizado",
        });
    }
  },
};
