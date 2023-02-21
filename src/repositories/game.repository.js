const BaseRepository = require("./base.repository");
let _game = null;

class GameRepository extends BaseRepository {
  constructor({ GameModel }) {
    super(GameModel);
    _game = GameModel;
  }

  async get(id) {
    return await _game.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }


  async getAll() {
    return await _game.findAll({
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsername(userName) {
    return await _game.findOne({
      where: { userName },
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsernameWithPassword(userName) {
    return await _game.findOne({
      where: { userName }
    });
  }
}

module.exports = GameRepository;
