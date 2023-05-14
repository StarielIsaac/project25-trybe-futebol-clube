import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.authenticateUser(email, password);
    res.status(200).json({ token });
  }
}
