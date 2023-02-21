const {
  UUID,
  UUIDV4,
  STRING,
  BOOLEAN,
  DATE,
  NOW,
  DOUBLE,
} = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: STRING,
      allowNull: true,
    },
    lastName: {
      type: STRING,
      allowNull: true,
    },
    userName: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The user just alphanimeric characters",
        },
        len: {
          args: [4, 20],
          msg: "The username must be from 4 to 20 characters",
        },
      },
    },
    email: {
      type: STRING,
      allowNull: true,
      unique: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },
    biography: {
      type: STRING,
      allowNull: true,
    },
    image: {
      type: STRING,
      allowNull: true,
    },
    country: {
      type: STRING,
      allowNull: true,
    },
    city: {
      type: STRING,
      allowNull: true,
    },
    status: {
      type: STRING,
      defaultValue: true,
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, //obliga a que la tabla se cree con el nombre implicito en la definicion del modelo. (users)
    timestamps: false, //evita que sequelize cree el los campos created_at y updated_at automaticamente.
  }
);

//TODO: Relacion 1N
// User.associate = (models) => {
//   User.hasMany(models.client, { foreignKey: "userId", as: "clients" });
// };

module.exports = User;
