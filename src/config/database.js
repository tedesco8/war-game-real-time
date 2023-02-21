const Sequelize = require("sequelize");
const models = require("../models");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      timezone: "Etc/GMT+7",
    },
    define: {
      timestimps: false,
    },
    pool: {
      max: 2000,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // logging: false,
    operatorAliases: false,
  }
);

sequelize
  .authenticate()
  .then(function () {
    console.log("Connected to the database.");
  })
  .catch(function (err) {
    console.log("Database connection error:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error(`Error: ${err.name}, Message: ${err.message}, SQL: ${err.sql}`);
  });

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = sequelize;
