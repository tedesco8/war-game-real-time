const { encryptWithAES, decryptWithAES } = require("../helpers");


class EncryptionService {
  constructor() {
  }

  async encryptData(data) {
    if (!data.trim()) {
      const error = new Error();
      error.status = 404;
      error.message = "Nothing to encrypt";
      throw error;
    }

    return encryptWithAES(data);
  }

  async decryptData(data) {
    if (!data.trim()) {
      const error = new Error();
      error.status = 404;
      error.message = "Nothing to decrypt";
      throw error;
    }

    return decryptWithAES(data);
  }
}

module.exports = EncryptionService;
