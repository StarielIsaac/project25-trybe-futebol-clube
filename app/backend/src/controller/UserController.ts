import { Request, Response } from 'express';
import UserService from '../services/UserService';
import ErrorLaunch from '../utils/errorLaunch';
// import typeUser from '../types/typeUser';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.authenticateUser(email, password);
    res.status(200).json({ token });
  }

  async verifyToken(req: Request, res: Response) {
    const { user } = req.headers;

    if (typeof user !== 'string') {
      throw new ErrorLaunch('token não deu certo', 401);
    }

    const { email } = JSON.parse(user);

    const role = await this.userService.verifyToken(email);
    res.status(200).json({ role });
  }
}
