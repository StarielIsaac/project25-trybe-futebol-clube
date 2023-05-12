import user from '../database/models/Users';

class LoginModel {
  constructor(private team = user) {}

  async authenticateUser(email: string, password: string) {
    const token = await this.team.findByPk();
    return token;
  }
}

export default LoginModel;
