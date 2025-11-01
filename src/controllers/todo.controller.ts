import type { Request, Response } from 'express';
import { todosService } from '../services/todos.service.js';

export const todosController = {
  getAll: async (req: Request, res: Response) => {
    const todos = await todosService.getAll();
    res.json(todos);
  },

  getById: async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    const todo = await todosService.getById(id);
    res.json(todo);
  },

  create: async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const todo = await todosService.createTask({ title, description });
    res.status(201).json(todo);
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    const { title, description } = req.body;
    const todo = await todosService.updateTask(id, { title, description });
    res.status(200).json(todo);
  },

  delete: async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    await todosService.deleteTask(id);
    return res.status(204).send();
  },
};
