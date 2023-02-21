const CryptoJS = require("crypto-js");

const encryptWithAES = (text) => {
  const publicKey = "SpTQ5FV2M4Gn2rEyaQ";
  return CryptoJS.AES.encrypt(text, publicKey).toString();
};

const decryptWithAES = (text) => {
  const publicKey = "SpTQ5FV2M4Gn2rEyaQ";
  const bytes = CryptoJS.AES.decrypt(text, publicKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  encryptWithAES,
  decryptWithAES
}