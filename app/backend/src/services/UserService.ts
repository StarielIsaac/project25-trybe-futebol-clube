import * as bcrypt from 'bcryptjs';
import ErrorLaunch from '../utils/errorLaunch';
import UserModel from '../model/UserModel';
import User from '../database/models/Users';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  // compara uma senha inserida com a senha criptografada de um usuário no banco de dados.
  private static isvalid(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }

  async authenticateUser(email: string, password: string) {
    const user = await this.userModel.authenticateUser(email, password);

    if (!user) {
      throw new ErrorLaunch('Invalid email or password', 401);
    }

    return user;
  }
}
