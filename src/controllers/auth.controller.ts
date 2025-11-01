import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const newUser = await authService.registerUser({ email, password });
    res.status(201).json(newUser);
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const login = await authService.loginUser({ email, password });
    res.status(200).json(login);
  },
};
