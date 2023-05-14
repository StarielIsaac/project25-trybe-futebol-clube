import * as bcrypt from 'bcryptjs';
import ErrorLaunch from '../utils/errorLaunch';
import UserModel from '../model/UserModel';
import User from '../database/models/Users';
import { createToken } from '../utils/auth/createToken';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  // compara uma senha inserida com a senha criptografada de um usuário no banco de dados.
  private static isvalid(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }

  async authenticateUser(email: string, password: string) {
    const user = await this.userModel.authenticateUser(email);

    if (!user) {
      throw new ErrorLaunch('Invalid email or password', 401);
    }

    if (!UserService.isvalid(user, password)) {
      throw new ErrorLaunch('Invalid email or password', 401);
    }

    const token = createToken({ email: user.email });
    return token;
  }
}
