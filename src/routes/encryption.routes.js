const { Router } = require("express");

module.exports = function({ EncryptionController }) {
  const router = Router();
  router.post("/encrypt", EncryptionController.encryptData);
  router.post("/decrypt", EncryptionController.decryptData);
  return router;
};
