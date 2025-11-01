import { describe, it, expect, beforeEach, vi } from 'vitest';
import { todosService } from '../../services/todos.service.js';
import { todosRepository } from '../../repositories/todos.repository.js';

vi.mock('../../repositories/todos.repository.js');

describe('TodosService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        createdAt: new Date(),
        isFinished: false,
      };

      (todosRepository.create as any).mockResolvedValue(mockTask);

      const result = await todosService.createTask({
        title: 'Test Task',
        description: 'Test Description',
      });

      expect(result).toEqual(mockTask);
      expect(todosRepository.create).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
      });
    });
  });
});
