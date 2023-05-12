import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  async authenticateUser(req: Request, res: Response) {
    const { email, string } = req.body;
    // const createdToken = await this.loginService.findById(email, string);
    res.status(200).json(createdToken);
  }
}
