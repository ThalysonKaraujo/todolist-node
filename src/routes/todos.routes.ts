import { Router } from 'express';
import { todosController } from '../controllers/todo.controller.js';
import {
  createTodosSchema,
  updateTodoSchema,
  todoParamsSchema,
} from '../schemas/todos.schema.js';
import { validate } from '../middlewares/validate.js';

export const todosRoutes = Router();

todosRoutes.get('/', todosController.getAll);

todosRoutes.get(
  '/:id',
  validate({ params: todoParamsSchema }),
  todosController.getById
);

todosRoutes.post(
  '/',
  validate({ body: createTodosSchema }),
  todosController.create
);

todosRoutes.put(
  '/:id',
  validate({ params: todoParamsSchema, body: updateTodoSchema }),
  todosController.update
);

todosRoutes.delete(
  '/:id',
  validate({ params: todoParamsSchema, body: createTodosSchema }),
  todosController.delete
);
