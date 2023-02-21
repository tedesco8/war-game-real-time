const {
  generateToken,
  comparePassword,
  decryptWithAES,
} = require("../helpers");

let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signIn(body) {
    const { userName, password } = body;
    if (!userName || !password) {
      const error = new Error();
      error.status = 400;
      error.message = "Invalid fields";
      throw error;
    }
    const entity = await _userService.getByUsernameWithPassword(userName);

    if (!entity) {
      const error = new Error();
      error.status = 404;
      error.message = `User does not exist`;
      throw error;
    }

    const aparentPass = decryptWithAES(password);
    const validPassword = await comparePassword(
      aparentPass,
      entity.password
    );
    if (!validPassword) {
      const error = new Error();
      error.status = 403;
      error.message = "Invalid Password";
      throw error;
    }

    const identityToEncode = {
      userName: entity.userName,
      name: entity.firstName + " " + entity.lastName,
      id: entity.id,
    };

    const token = generateToken(identityToEncode);

    return { token };
  }
}

module.exports = AuthService;
