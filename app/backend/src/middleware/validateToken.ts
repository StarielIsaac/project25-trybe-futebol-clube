import { NextFunction, Response, Request } from 'express';
import { verifyToken } from '../utils/auth/createToken';
// import typeUser from '../types/typeUser';
// import Joi from 'joi';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const user = verifyToken(authorization);

  req.headers.user = JSON.stringify(user);

  next();
}
