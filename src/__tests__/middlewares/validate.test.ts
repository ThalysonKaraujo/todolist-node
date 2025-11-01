import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { validate } from '../../middlewares/validate.js';
import {
  createTodosSchema,
  updateTodoSchema,
  todoParamsSchema,
} from '../../schemas/todos.schema.js';

describe('Validate Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn();
  });

  describe('Body Validation', () => {
    it('should pass validation with valid body', async () => {
      mockRequest.body = {
        title: 'Valid Title',
        description: 'Valid Description',
      };

      const middleware = validate({ body: createTodosSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 400 when title is too short', async () => {
      mockRequest.body = {
        title: 'ab',
        description: 'Valid Description',
      };

      const middleware = validate({ body: createTodosSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erro de validação',
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: 'title',
            message: 'Título deve ter no mínimo 3 caracteres',
          }),
        ]),
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when title is missing', async () => {
      mockRequest.body = {
        description: 'Valid Description',
      };

      const middleware = validate({ body: createTodosSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erro de validação',
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: 'title',
          }),
        ]),
      });
    });

    it('should remove extra fields not in schema', async () => {
      mockRequest.body = {
        title: 'Valid Title',
        description: 'Valid Description',
        extraField: 'Should be removed',
      };

      const middleware = validate({ body: createTodosSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.body).not.toHaveProperty('extraField');
      expect(mockRequest.body).toEqual({
        title: 'Valid Title',
        description: 'Valid Description',
      });
    });
  });

  describe('Params Validation', () => {
    it('should pass validation with valid numeric ID', async () => {
      mockRequest.params = { id: '123' };

      const middleware = validate({ params: todoParamsSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.params.id).toBe(123);
    });

    it('should return 400 when ID is not numeric', async () => {
      mockRequest.params = { id: 'abc' };

      const middleware = validate({ params: todoParamsSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Erro de validação',
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: 'id',
            message: 'ID deve ser um número válido',
          }),
        ]),
      });
    });

    it('should return 400 when ID contains special characters', async () => {
      mockRequest.params = { id: '12.5' };

      const middleware = validate({ params: todoParamsSchema });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Combined Validation (Body + Params)', () => {
    it('should validate both body and params successfully', async () => {
      mockRequest.body = {
        title: 'Updated Title',
      };
      mockRequest.params = { id: '1' };

      const middleware = validate({
        body: updateTodoSchema,
        params: todoParamsSchema,
      });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.params.id).toBe(1);
      expect(mockRequest.body.title).toBe('Updated Title');
    });

    it('should return 400 when params are invalid even if body is valid', async () => {
      mockRequest.body = {
        title: 'Valid Title',
      };
      mockRequest.params = { id: 'invalid' };

      const middleware = validate({
        body: updateTodoSchema,
        params: todoParamsSchema,
      });
      await middleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
