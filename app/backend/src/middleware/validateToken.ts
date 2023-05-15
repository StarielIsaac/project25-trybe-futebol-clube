import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/auth/createToken';
import typeUser from '../types/typeUser';
// import Joi from 'joi';

export default function validateToken(req: typeUser, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const user = verifyToken(authorization);

  req.user = user;

  next();
}
