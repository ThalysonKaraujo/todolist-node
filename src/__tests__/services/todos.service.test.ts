import { describe, it, expect, beforeEach, vi } from 'vitest';
import { todosService } from '../../services/todos.service.js';
import { todosRepository } from '../../repositories/todos.repository.js';

vi.mock('../../repositories/todos.repository.js');

// Cria versões tipadas dos mocks
const mockedRepository = vi.mocked(todosRepository);

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

      mockedRepository.create.mockResolvedValue(mockTask);

      const result = await todosService.createTask({
        title: 'Test Task',
        description: 'Test Description',
      });

      expect(result).toEqual(mockTask);
      expect(mockedRepository.create).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
      });
    });
  });

  describe('getById', () => {
    it('should return a task when found', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        createdAt: new Date(),
        isFinished: false,
      };

      mockedRepository.findById.mockResolvedValue(mockTask);

      const result = await todosService.getById(1);

      expect(result).toEqual(mockTask);
      expect(mockedRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFound when search for a non existing id', async () => {
      mockedRepository.findById.mockResolvedValue(undefined);

      await expect(todosService.getById(999)).rejects.toThrow(
        'Task não encontrada'
      );
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const existingTask = {
        id: 1,
        title: 'Old Title',
        description: 'Old Description',
        createdAt: new Date(),
        isFinished: false,
      };

      const updatedTask = {
        ...existingTask,
        title: 'New Title',
        isFinished: true,
      };

      mockedRepository.findById.mockResolvedValue(existingTask);
      mockedRepository.update.mockResolvedValue(updatedTask);

      const result = await todosService.updateTask(1, {
        title: 'New Title',
        isFinished: true,
      });

      expect(result).toEqual(updatedTask);
      expect(mockedRepository.findById).toHaveBeenCalledWith(1);
      expect(mockedRepository.update).toHaveBeenCalledWith(1, {
        title: 'New Title',
        isFinished: true,
      });
    });

    it('should throw NotFoundError when updating non-existent task', async () => {
      mockedRepository.findById.mockResolvedValue(undefined);

      await expect(
        todosService.updateTask(999, { title: 'New Title' })
      ).rejects.toThrow('Essa Task não existe');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const existingTask = {
        id: 1,
        title: 'Task to Delete',
        description: 'Description',
        createdAt: new Date(),
        isFinished: false,
      };

      mockedRepository.findById.mockResolvedValue(existingTask);
      mockedRepository.delete.mockResolvedValue(undefined);

      const result = await todosService.deleteTask(1);

      expect(result).toEqual({ message: 'Task deletada com sucesso' });
      expect(mockedRepository.findById).toHaveBeenCalledWith(1);
      expect(mockedRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError when deleting non-existent task', async () => {
      mockedRepository.findById.mockResolvedValue(undefined);

      await expect(todosService.deleteTask(999)).rejects.toThrow(
        'Essa Task não existe'
      );
    });
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          createdAt: new Date(),
          isFinished: false,
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          createdAt: new Date(),
          isFinished: true,
        },
      ];

      mockedRepository.findAll.mockResolvedValue(mockTasks);

      const result = await todosService.getAll();

      expect(result).toEqual(mockTasks);
      expect(mockedRepository.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no tasks exist', async () => {
      mockedRepository.findAll.mockResolvedValue([]);

      const result = await todosService.getAll();

      expect(result).toEqual([]);
    });
  });
});
