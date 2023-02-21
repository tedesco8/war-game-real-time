const BaseRepository = require("./base.repository");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
    _user = UserModel;
  }

  async getAll() {
    return await this.model.findAll({
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsername(userName) {
    return await _user.findOne({
      where: { userName },
      attributes: {
        exclude: ["password", "tokenChangePassword"],
      },
    });
  }

  async getByUsernameWithPassword(userName) {
    return await _user.findOne({
      where: { userName }
    });
  }
}

module.exports = UserRepository;
