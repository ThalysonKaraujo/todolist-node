// src/errors/ValidationError.ts
import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  constructor(message: string = 'Dados inválidos') {
    super(message, 400);
    this.name = 'ValidationError';
  }
}
