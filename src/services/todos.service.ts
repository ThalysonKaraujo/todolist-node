import { NotFoundError } from '../errors/NotFoundError.js';
import { todosRepository } from '../repositories/todos.repository.js';

export const todosService = {
  getAll: async (userId: number) => {
    return await todosRepository.findAll(userId);
  },

  getById: async (userId: number, todoId: number) => {
    const todo = await todosRepository.findById(todoId, userId);
    if (!todo) {
      throw new NotFoundError('Task não encontrada');
    }
    return todo;
  },

  createTask: async (
    userId: number,
    data: { title: string; description?: string }
  ) => {
    const todoData = {
      ...data,
      userId: userId,
    };

    const newTodo = await todosRepository.create(todoData);
    return newTodo;
  },

  deleteTask: async (userId: number, todoId: number) => {
    const result = await todosRepository.delete(todoId, userId);
    if (!result) {
      throw new NotFoundError('Essa Task não existe');
    }
    return { message: 'Task deletada com sucesso' };
  },

  updateTask: async (
    userId: number,
    todoId: number,
    data: { title?: string; description?: string; isFinished?: boolean }
  ) => {
    const updatedTask = await todosRepository.update(todoId, userId, data);
    if (!updatedTask) {
      throw new NotFoundError('Essa Task não existe');
    }
    return updatedTask;
  },
};
