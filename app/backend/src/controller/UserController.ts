import { Request, Response } from 'express';
import UserService from '../services/UserService';
import typeUser from '../types/typeUser';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.authenticateUser(email, password);
    res.status(200).json({ token });
  }

  async verifyToken(req: typeUser, res: Response) {
    const { email } = req.user;
    const role = await this.userService.verifyToken(email);
    res.status(200).json({ role });
  }
}
