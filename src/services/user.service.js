const BaseService = require("./base.service");
const { hashPassword, decryptWithAES } = require("../helpers");

let _userRepository = null;
let _emailService = null;

class UserService extends BaseService {
  constructor({ UserRepository, EmailService }) {
    super(UserRepository, EmailService);
    _userRepository = UserRepository;
    _emailService = EmailService;
  }

  async create(user) {
    const { userName } = user;
    const isComingPass = user.password ? true : false;
    let randomPassword = null;

    const userExist = await _userRepository.getByUsername(userName);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "User already exist";
      throw error;
    }

    if (!isComingPass) {
      randomPassword = Math.random().toString(36).slice(-8);
      user.password = await hashPassword(randomPassword);
    } else {
      const decrypted = decryptWithAES(user.password);
      user.password = await hashPassword(decrypted);
    }

    const userCreated = await _userRepository.create(user);

    if (userCreated && !isComingPass) this.sendPasswordEmail(userCreated, randomPassword);

    return userCreated;
  }

  async getByUsername(userName) {
    const user = await _userRepository.getByUsername(userName);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "User does not exist";
      throw error;
    }
    return user;
  }

  async getByUsernameWithPassword(userName) {
    const user = await _userRepository.getByUsernameWithPassword(userName);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "User does not exist";
      throw error;
    }
    return user;
  }

  async sendPasswordEmail(user, temporalPassword) {
    const { email } = user;
    const mailOptions = {
      from: "Easy Rent", // sender address
      to: email, // list of receivers
      subject: `Credenciales`, // Subject line
      html: `<h2>Tu cuenta fue creada</h2>
            <h3>Cambia tu password cuando puedas.</h3>
            <p>${temporalPassword}</p>`,
    };

    await _emailService.sendEmail(mailOptions);
  }
}

module.exports = UserService;
