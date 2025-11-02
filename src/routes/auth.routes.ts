import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  validate({ body: registerSchema }),
  authController.register
);

authRoutes.post(
  '/login',
  validate({ body: loginSchema }),
  authController.login
);
