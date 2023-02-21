const util = require("util");

let _transport = null;

class EmailService {
  constructor({ transport }) {
    _transport = transport;
  }

  async sendEmail(mailOptions) {
    const enviarEmail = util.promisify(_transport.sendMail, _transport);
    const send = await enviarEmail.call(_transport, mailOptions);
    if (!send) {
      const error = new Error();
      const message = "The email could not be sent";
      error.status = 404;
      error.message = message;
      console.error("EmailService: " + message)
      throw error;
    }
    console.log("EmailService: " + send.message)
    return send;
  }
}

module.exports = EmailService;
