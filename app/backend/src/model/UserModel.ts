import User from '../database/models/Users';

class UserModel {
  constructor(private user = User) {}

  // encontra o usuario de acordo com o email
  async authenticateUser(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }
}

export default UserModel;
