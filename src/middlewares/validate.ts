import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

interface ValidationSchemas {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  query?: z.ZodSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.params) {
        const validated = await schemas.params.parseAsync(req.params);
        req.params = validated as Request['params'];
      }

      if (schemas.query) {
        const validated = await schemas.query.parseAsync(req.query);
        req.query = validated as Request['query'];
      }

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
