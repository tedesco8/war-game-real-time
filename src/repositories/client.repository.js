const BaseRepository = require("./base.repository");
let _client = null;

class ClientRepository extends BaseRepository {
  constructor({ ClientModel }) {
    super(ClientModel);
    _client = ClientModel;
  }

  async get(id) {
    return await _client.findOne({
      where: { id },
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }


  async getAll() {
    return await _client.findAll({
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsername(userName) {
    return await _client.findOne({
      where: { userName },
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsernameWithPassword(userName) {
    return await _client.findOne({
      where: { userName }
    });
  }
}

module.exports = ClientRepository;
