import LoginModel from '../model/LoginModel';

export default class LoginService {
  constructor(private loginModel = new LoginModel()) {}

  async authenticateUser(email: string, password: string) {
    const createdToken = await this.loginModel.authenticateUser(email, password);
    return createdToken;
  }
}
