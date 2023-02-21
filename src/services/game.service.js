const BaseService = require("./base.service");

let _gameRepository = null;

class GameService extends BaseService {
  constructor({ GameRepository }) {
    super(GameRepository);
    _gameRepository = GameRepository;
  }

  async getByUsername(userName) {
    const client = await _gameRepository.getByUsername(userName);
    if (!client) {
      const error = new Error();
      error.status = 400;
      error.message = "Client does not exist";
      throw error;
    }
    return client;
  }
}

module.exports = GameService;
