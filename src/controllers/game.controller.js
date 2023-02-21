let _gameService = null;
class GameController {
  constructor({ GameService }) {
    _gameService = GameService;
  }

  async get(req, res) {
    const { id } = req.params;
    const game = await _gameService.get(id);
    return res.send(game);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const games = await _gameService.getAll(pageSize, pageNum);
    return res.send(games);
  }

  async create(req, res) {
    const { body } = req;
    const game = await _gameService.create(body);
    return res.status(201).send(game);
  }

  async update(req, res) {
    const { body } = req;
    const { id } = req.params;
    const game = await _gameService.update(id, body);
    return res.send(game);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deletedClient = await _gameService.delete(id);
    return res.send(deletedClient);
  }

  async getByUserName(req, res) {
    const { userName } = req.params;
    const client = await _gameService.getByUserName(userName);
    return res.send(client);
  }
}

module.exports = GameController;

