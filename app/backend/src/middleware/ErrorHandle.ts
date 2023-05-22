// import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ErrorLaunch from '../utils/errorLaunch';

// Função que trata erros e retorna uma resposta com uma mensagem de erro apropriada
const errorHandler : ErrorRequestHandler = (err : Error, _req, res, _next) => {
  // Se o erro for uma instância da classe ErrorLaunch,
  // trata-se de um erro personalizado lançado pela aplicação.
  // console.log(err);
  if (err instanceof ErrorLaunch) {
    return res.status(err.code).json({ message: err.message });
  }
  // Se o erro for uma instância da classe TokenExpiredError, significa que o token expirou
  // Se o erro for uma instância da classe JsonWebTokenError, significa que o token é inválido
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  // Se o erro não for uma instância das classes anteriores, trata-se de um erro interno do servidor
  return res.status(500).json({ message: 'internal server error' });
};

export default errorHandler;
