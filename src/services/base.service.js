class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async get(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.get(id);

    if (!currentEntity) {
      const error = new Error();
      error.status = 404;
      error.message = "entity does not exist";
      throw error;
    }

    return currentEntity;
  }

  async getAll(pageSize, pageNum) {
    return await this.repository.getAll(pageSize, pageNum);
  }

  async create(entity) {
    return await this.repository.create(entity);
  }

  async update(id, entity) {
    let isUpdated = null;
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    await this.get(id);

    isUpdated = await this.repository.update(id, entity);

    if (!isUpdated) {
      const error = new Error();
      error.status = 500;
      error.message = "failed to update";
      throw error;
    }

    return isUpdated;
  }

  async delete(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.delete(id);
  }
}

module.exports = BaseService;
