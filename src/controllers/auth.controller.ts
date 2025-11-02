import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import type { LoginUserInput } from '../schemas/auth.schema.js';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const newUser = await authService.registerUser({ email, password });
    res.status(201).json(newUser);
  },
  // eslint-disable-next-line
  login: async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser({ email, password });
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sevenDaysInMs,
      sameSite: 'lax',
    });
    res.status(200).json(user);
  },
};
