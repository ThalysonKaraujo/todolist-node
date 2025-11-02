import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotFoundError } from '../errors/NotFoundError.js';
import { AppError } from '../errors/AppError.js';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new NotFoundError('Token não encontrado'));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT não configurado');
    }

    const decoded = jwt.verify(token, jwtSecret!) as jwt.JwtPayload;
    req.user = { id: decoded.sub as unknown as number };
    next();
    // eslint-disable-next-line
  } catch (error) {
    return next(new AppError('Token inválido ou expirado', 401));
  }
}
