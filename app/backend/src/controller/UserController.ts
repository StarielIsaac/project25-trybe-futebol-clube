import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class LoginController {
  constructor(private userService = new UserService()) {}

  async authenticateUser(req: Request, res: Response) {
    const { email, string } = req.body;
    const createdToken = await this.userService.authenticateUser(email, string);
    res.status(200).json(createdToken);
  }
}
