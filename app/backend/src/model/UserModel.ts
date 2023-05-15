import User from '../database/models/Users';

class UserModel {
  constructor(private user = User) {}

  // encontra o usuario de acordo com o email
  async findUser(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }

  async findUserById(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user as User;
  }
}

export default UserModel;
