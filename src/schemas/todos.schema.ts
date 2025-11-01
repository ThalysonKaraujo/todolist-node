import { z } from 'zod';

export const createTodosSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  isFinished: z.boolean().optional(),
});

export const todoParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID deve ser um número válido')
    .transform(Number),
});

export type CreateTodoInput = z.infer<typeof createTodosSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoParamsInput = z.infer<typeof todoParamsSchema>;
