import { NextFunction, Request, Response } from 'express';
// import Joi from 'joi';

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (typeof email !== 'string' || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (!isValidEmail(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
