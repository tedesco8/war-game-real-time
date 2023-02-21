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
    const { clientId } = req.params;
    const updatedClient = await _gameService.update(clientId, body);
    return res.send(updatedClient);
  }

  async delete(req, res) {
    const { clientId } = req.params;
    const deletedClient = await _gameService.delete(clientId);
    return res.send(deletedClient);
  }

  async getByUserName(req, res) {
    const { clientName } = req.params;
    const client = await _gameService.getByUserName(clientName);
    return res.send(client);
  }
}

module.exports = GameController;

