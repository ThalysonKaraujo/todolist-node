import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/auth.repository.js';
import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ValidationError } from '../errors/ValidationError.js';

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
  loginUser: async (data: { email: string; password: string }) => {
    const { email, password } = data;

    const existingUser = await authRepository.findByEmail(email);
    if (!existingUser) {
      throw new NotFoundError('Email não encontrado');
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new ValidationError('Senha Incorreta');
    } else {
      const payload = { sub: existingUser.id };

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new AppError('Segredo JWT não configurado', 500);
      }

      const options = { expiresIn: '7d' } as jwt.SignOptions;

      const token = jwt.sign(payload, jwtSecret!, options);
      // eslint-disable-next-line
      const { password: __, ...userWithoutPassword } = existingUser;

      return { token, user: userWithoutPassword };
    }
  },
};

async function gerarToken(payload, jwtSecret!, options){

}
