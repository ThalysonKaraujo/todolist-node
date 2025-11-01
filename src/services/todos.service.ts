import { AppError } from '../errors/AppError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { todosRepository } from '../repositories/todos.repository.js';

export const todosService = {
  getAll: async () => {
    return await todosRepository.findAll();
  },

  getById: async (id: number) => {
    const todo = await todosRepository.findById(id);
    if (!todo) {
      throw new AppError('Task não encontrada');
    }
    return todo;
  },

  createTask: async (data: { title: string; description?: string }) => {
    return await todosRepository.create(data);
  },

  deleteTask: async (id: number) => {
    const todo = await todosRepository.findById(id);
    if (!todo) {
      throw new NotFoundError('Essa Task não existe');
    }
    await todosRepository.delete(id);
    return { message: 'Task deletada com sucesso' };
  },

  updateTask: async (
    id: number,
    data: { title?: string; description?: string; isFinished?: boolean }
  ) => {
    const exists = await todosRepository.findById(id);
    if (!exists) {
      throw new NotFoundError('Essa Task não existe');
    }
    return await todosRepository.update(id, data);
  },
};
