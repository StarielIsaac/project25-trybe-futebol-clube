import jwt = require('jsonwebtoken');
import { typePayload } from '../../types/typePayload';
import payloadJWT from '../../types/payloadJwt';

const SECRET_KEY = process.env.JWT_SECRET || 'SECRET';

const config: jwt.SignOptions = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

export function createToken(payload: typePayload): string {
  const token = jwt.sign(payload, SECRET_KEY, config);
  return token;
}

export function verifyToken(token: string): payloadJWT {
  const isValid = jwt.verify(token, SECRET_KEY);
  return isValid as payloadJWT;
}
