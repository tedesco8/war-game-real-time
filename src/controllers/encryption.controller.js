let _encryptionService = null;

class EncryptionController {
  constructor({ EncryptionService }) {
    _encryptionService = EncryptionService;
  }

  async encryptData(req, res) {
    const { data } = req.body;
    const creds = await _encryptionService.encryptData(data);
    return res.send(creds);
  }

  async decryptData(req, res) {
    const { data } = req.body;
    const creds = await _encryptionService.decryptData(data);
    return res.send(creds);
  }
}

module.exports = EncryptionController;
