import { Router } from 'express';
import { todosController } from '../controllers/todo.controller.js';
import {
  createTodosSchema,
  updateTodoSchema,
  todoParamsSchema,
} from '../schemas/todos.schema.js';
import { validate } from '../middlewares/validate.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

export const todosRoutes = Router();

todosRoutes.get('/', isAuthenticated, todosController.getAll);

todosRoutes.get(
  '/:id',
  isAuthenticated,
  validate({ params: todoParamsSchema }),
  todosController.getById
);

todosRoutes.post(
  '/',
  isAuthenticated,
  validate({ body: createTodosSchema }),
  todosController.create
);

todosRoutes.put(
  '/:id',
  isAuthenticated,
  validate({ params: todoParamsSchema, body: updateTodoSchema }),
  todosController.update
);

todosRoutes.delete(
  '/:id',
  isAuthenticated,
  validate({ params: todoParamsSchema, body: createTodosSchema }),
  todosController.delete
);
