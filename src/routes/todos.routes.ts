import { Router } from 'express';
import { todosController } from '../controllers/todo.controller.js';

export const todosRoutes = Router();

todosRoutes.get('/', todosController.getAll);
todosRoutes.get('/:id', todosController.getById);
todosRoutes.post('/', todosController.create);
todosRoutes.put('/:id', todosController.update);
todosRoutes.delete('/:id', todosController.delete);
