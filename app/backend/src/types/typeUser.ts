import { Request } from 'express';

export default interface typeUser extends Request {
  user: {
    email: string;
  };
}
