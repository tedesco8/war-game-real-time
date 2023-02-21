class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    return await this.model.findOne({ where: { id } });
  }

  async getAll() {
    return await this.model.findAll({
      order: [["id", "DESC"]],
    });
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id, entity) {
    let isEntityUpdated = null;
    await this.model.findOne({ where: { id } }).then((user) => {
      isEntityUpdated = user.update(entity);
    });
    return isEntityUpdated;
  }

  async delete(id) {
    await this.model.destroy({ where: { id } });
    return true;
  }
}

module.exports = BaseRepository;
