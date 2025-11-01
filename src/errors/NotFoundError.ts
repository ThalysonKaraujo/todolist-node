// src/errors/NotFoundError.ts
import { AppError } from './AppError.js';

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
