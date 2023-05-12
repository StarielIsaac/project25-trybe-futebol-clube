import User from '../database/models/Users';

class LoginModel {
  constructor(private user = User) {}

  // encontra o usuario de acordo com o email
  async authenticateUser(email: string, _password: string) {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }
}

export default LoginModel;
