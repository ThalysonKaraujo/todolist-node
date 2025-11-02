import type { Request, Response } from 'express';
import { todosService } from '../services/todos.service.js';

interface AuthRequest extends Request {
  user: { id: number };
}

export const todosController = {
  getAll: async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const todos = await todosService.getAll(userId);
    res.json(todos);
  },

  getById: async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const todoId = Number(req.params.id);
    const todo = await todosService.getById(userId, todoId);
    res.json(todo);
  },

  create: async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const todoData = req.body;
    const todo = await todosService.createTask(userId, todoData);
    res.status(201).json(todo);
  },

  update: async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const todoId = Number(req.params.id);
    const { title, description, isFinished } = req.body;
    const todo = await todosService.updateTask(userId, todoId, {
      title,
      description,
      isFinished,
    });
    res.status(200).json(todo);
  },

  delete: async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const todoId = Number(req.params.id);
    await todosService.deleteTask(userId, todoId);
    return res.status(204).send();
  },
};
