let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signIn(req, res) {
    const { body } = req;
    const creds = await _authService.signInClient(body);
    return res.send(creds);
  }

  async internalSignIn(req, res) {
    const { body } = req;
    const creds = await _authService.signInUser(body);
    return res.send(creds);
  }
}

module.exports = AuthController;
