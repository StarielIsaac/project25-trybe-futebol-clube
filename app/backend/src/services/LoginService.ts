import ErrorLaunch from '../utils/errorLaunch';
import LoginModel from '../model/LoginModel';

export default class LoginService {
  constructor(private loginModel = new LoginModel()) {}

  async authenticateUser(email: string, password: string) {
    const user = await this.loginModel.authenticateUser(email, password);

    if (!user) {
      throw new ErrorLaunch('Invalid email or password', 401);
    }

    return user;
  }
}
