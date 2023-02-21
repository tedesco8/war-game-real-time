const { UUIDV4, UUID, STRING, DATE, NOW, ENUM } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Game = sequelize.define(
  "games",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4,
    },
    winner: {
      type: UUID,
      allowNull: true,
    },
    observations: {
      type: STRING,
      allowNull: true,
    },
    status: {
      type: ENUM({ values: ["initiated", "progress", "aborted", "finalized"] }),
      allowNull: true,
      defaultValue: "initiated",
    },
    createAt: {
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

//TODO: Relacion MN
Game.belongsToMany(User, { through: "games_users" });
User.belongsToMany(Game, { through: "games_users" });

//TODO: Relacion 1N
// Games.associate = (models) => {
//   Games.belongsTo(models.user, {
//     foreignKey: "userId",
//     as: "users",
//   });
// };

module.exports = Game;
