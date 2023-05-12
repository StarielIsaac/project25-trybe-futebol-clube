import * as jwt from 'jsonwebtoken';
import { typePayload } from '../../types/typePayload';

const SECRET_KEY = process.env.JWT_SECRET || 'SECRET';

export function generateToken(payload: typePayload): string {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

export function verifyToken(token: string): typePayload {
  const isvalid = jwt.verify(token, SECRET_KEY);
  return isvalid as typePayload;
}
