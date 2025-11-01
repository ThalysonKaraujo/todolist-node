import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema } from '../schemas/auth.schema.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validate({ body: registerSchema }),
  authController.register
);
