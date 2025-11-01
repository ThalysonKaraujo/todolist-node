import * as bcrypt from 'bcryptjs';
import { authRepository } from '../repositories/auth.repository.js';
import { AppError } from '../errors/AppError.js';

export const authService = {
  registerUser: async (data: { email: string; password: string }) => {
    const { email, password } = data;

    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Esse email já está cadastrado', 409);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await authRepository.createUser({
      email: email,
      password: hashedPassword,
    });
    return newUser;
  },
};
