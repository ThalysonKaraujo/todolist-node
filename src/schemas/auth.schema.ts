import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'A senha precisa ter pelomenos 8 caracteres'),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'A senha precisa ter pelomenos 8 caracteres'),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;
